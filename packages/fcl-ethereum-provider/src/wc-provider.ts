import {
  EthereumProvider,
  EthereumProviderOptions,
  OPTIONAL_EVENTS,
  OPTIONAL_METHODS,
  REQUIRED_EVENTS,
  REQUIRED_METHODS,
} from "@walletconnect/ethereum-provider"
import {
  NamespaceConfig,
  UniversalProvider,
} from "@walletconnect/universal-provider"
import {SessionTypes} from "@walletconnect/types"
import {FLOW_CHAINS, FlowNetwork} from "./constants"
import {formatChainId} from "./util/eth"
import {getAccountsFromNamespaces} from "@walletconnect/utils"
import {FLOW_METHODS} from "@onflow/fcl-wc"
import * as fcl from "@onflow/fcl"
import {Service} from "@onflow/typedefs"

const BASE_WC_SERVICE = (
  externalProvider: InstanceType<typeof UniversalProvider>
) =>
  ({
    f_type: "Service",
    f_vsn: "1.0.0",
    type: "authn",
    method: "WC/RPC",
    uid: "cross-vm-walletconnect#authn",
    endpoint: "flow_authn",
    optIn: true,
    provider: {
      address: null,
      name: "WalletConnect",
      icon: "https://avatars.githubusercontent.com/u/37784886",
      description: "WalletConnect Base Service",
      website: "https://walletconnect.com",
      color: null,
      supportEmail: null,
    },
    params: {
      externalProvider,
    },
  }) as unknown as Service

export class WalletConnectEthereumProvider extends EthereumProvider {
  static async init(
    opts: EthereumProviderOptions
  ): Promise<WalletConnectEthereumProvider> {
    const provider = new WalletConnectEthereumProvider()
    await provider.initialize(opts)

    // Refresh the FCL user to align with the WalletConnect session
    async function refreshFclUser() {
      const fclUser = fcl.currentUser()
      const wcService = BASE_WC_SERVICE(provider.signer)
      const snapshot = await fclUser.snapshot()

      // Find the authentication service from the current FCL user snapshot
      const authnService = snapshot?.services.find(
        service => service.type === "authn"
      )

      // If there’s no auth service or the auth service
      if (authnService && authnService.uid !== wcService.uid) {
        // Another FCL user is already authenticated, we need to unauthenticate it
        if (provider.signer.session) {
          await fclUser.authenticate({service: wcService, forceReauth: true})
        }
      } else {
        // Determine the external provider's topic from the auth service params
        const externalProvider = authnService?.params?.externalProvider as
          | string
          | InstanceType<typeof UniversalProvider>
          | undefined
        const externalProviderTopic =
          typeof externalProvider === "string"
            ? externalProvider
            : (externalProvider?.session?.topic ?? null)

        // If the provider is already connected with a matching session, re-authenticate the user
        if (
          provider.signer.session &&
          (externalProviderTopic == null ||
            externalProviderTopic === provider.signer.session.topic)
        ) {
          await fclUser.authenticate({service: wcService, forceReauth: true})
        } else if (!provider.signer.session) {
          // If no session is set but FCL is still authenticated, unauthenticate the user
          await fclUser.unauthenticate()
        }
      }
    }

    // Set up event listeners regardless of the current authentication state
    provider.on("connect", async () => {
      try {
        await refreshFclUser()
      } catch (error) {
        console.error("Error during authentication on connect:", error)
      }
    })

    provider.on("disconnect", async () => {
      try {
        await refreshFclUser()
      } catch (error) {
        console.error("Error during unauthentication on disconnect:", error)
      }
    })

    return provider
  }

  async connect(
    opts?: Parameters<InstanceType<typeof EthereumProvider>["connect"]>[0]
  ) {
    if (!this.signer.client) {
      throw new Error("Provider not initialized. Call init() first")
    }

    this.loadConnectOpts(opts)

    const chains = new Set(opts?.chains ?? [])
    const optionalChains = new Set(opts?.optionalChains ?? [])
    const chainIds = Array.from(chains).concat(Array.from(optionalChains))

    const flowNetwork = Object.entries(FLOW_CHAINS).find(
      ([, {eip155ChainId}]) => {
        if (chainIds.includes(eip155ChainId)) {
          return true
        }
        return false
      }
    )?.[0]
    if (!flowNetwork) {
      throw new Error(
        `Unsupported chainId: ${chainIds.join(", ")}, expected one of ${Object.values(
          FLOW_CHAINS
        )
          .map(({eip155ChainId}) => eip155ChainId)
          .join(", ")}`
      )
    }

    const {required, optional} = buildNamespaces(flowNetwork as FlowNetwork)
    try {
      const session = await new Promise<SessionTypes.Struct | undefined>(
        async (resolve, reject) => {
          if (this.rpc.showQrModal) {
            this.modal?.subscribeModal((state: {open: boolean}) => {
              // the modal was closed so reject the promise
              if (!state.open && !this.signer.session) {
                this.signer.abortPairingAttempt()
                reject(new Error("Connection request reset. Please try again."))
              }
            })
          }
          await this.signer
            .connect({
              namespaces: required,
              optionalNamespaces: optional,
              pairingTopic: opts?.pairingTopic,
            })
            .then((session?: SessionTypes.Struct) => {
              resolve(session)
            })
            .catch((error: unknown) => {
              var newErr = new Error("Failed to connect")
              if (error instanceof Error)
                newErr.stack += "\nCaused by: " + error.stack
              throw newErr
            })
        }
      )
      if (!session) return

      const accounts = getAccountsFromNamespaces(session.namespaces, [
        this.namespace,
      ])
      // if no required chains are set, use the approved accounts to fetch chainIds
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : accounts)
      this.setAccounts(accounts)
      this.events.emit("connect", {chainId: formatChainId(this.chainId)})
    } catch (error) {
      this.signer.logger.error(error)
      throw error
    } finally {
      if (this.modal) this.modal.closeModal()
    }
  }
}

function buildNamespaces(network: FlowNetwork): {
  required: NamespaceConfig
  optional: NamespaceConfig
} {
  const {eip155ChainId} = FLOW_CHAINS[network]

  return {
    required: {
      eip155: {
        methods: REQUIRED_METHODS,
        chains: [`eip155:${eip155ChainId}`],
        events: REQUIRED_EVENTS,
      },
    },
    optional: {
      eip155: {
        methods: OPTIONAL_METHODS,
        chains: [`eip155:${eip155ChainId}`],
        events: OPTIONAL_EVENTS,
      },
      flow: {
        methods: Object.values(FLOW_METHODS),
        events: ["chainChanged", "accountsChanged"],
        chains: [`flow:${network}`],
      },
    },
  }
}
