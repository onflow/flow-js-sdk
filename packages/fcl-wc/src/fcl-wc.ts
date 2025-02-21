import * as fclCore from "@onflow/fcl-core"
import {invariant} from "@onflow/util-invariant"
import {LEVELS, log} from "@onflow/util-logger"
export {getSdkError} from "@walletconnect/utils"
import {makeServicePlugin} from "./service"
import {CoreTypes} from "@walletconnect/types"
import {
  UniversalProvider,
  UniversalProviderOpts,
} from "@walletconnect/universal-provider"

export interface FclWalletConnectConfig {
  projectId: string
  metadata?: CoreTypes.Metadata
  includeBaseWC?: boolean
  wcRequestHook?: any
  pairingModalOverride?: any
  wallets?: any[]
  disableNotifications?: boolean
}

const DEFAULT_RELAY_URL = "wss://relay.walletconnect.com"
const DEFAULT_LOGGER = "debug"
let providerPromise: Promise<InstanceType<typeof UniversalProvider> | null> =
  Promise.resolve(null)

const initClient = async ({
  projectId,
  metadata,
}: {
  projectId: string
  metadata?: CoreTypes.Metadata
}) => {
  invariant(
    projectId != null,
    "FCL Wallet Connect Error: WalletConnect projectId is required"
  )
  try {
    return UniversalProvider.init({
      logger: DEFAULT_LOGGER,
      relayUrl: DEFAULT_RELAY_URL,
      projectId: projectId,
      metadata: metadata,
    })
  } catch (error) {
    if (error instanceof Error) {
      log({
        title: `${error.name} fcl-wc Init Client`,
        message: error.message,
        level: LEVELS.error,
      })
    }
    throw error
  }
}

const initUniversalProvider = async (opts: UniversalProviderOpts) => {
  return UniversalProvider.init({})
}

export const initLazy = (config: FclWalletConnectConfig) => {
  const {FclWcServicePlugin, providerPromise} = initHelper(config)
  fclCore.discovery.authn.update()

  return {
    FclWcServicePlugin,
    providerPromise,
  }
}

export const init = async (config: FclWalletConnectConfig) => {
  const {FclWcServicePlugin, providerPromise} = initLazy(config)
  const client = await providerPromise
  fclCore.discovery.authn.update()

  return {
    FclWcServicePlugin,
    client,
  }
}

const initHelper = (config: FclWalletConnectConfig) => {
  if (typeof window === "undefined") {
    throw new Error(
      "FCL Wallet Connect Plugin can only be initialized in the browser"
    )
  }

  // Lazy load the SignClient
  //  - Initialize the client if it doesn't exist
  //  - If it does exist, return existing client
  //  - If existing client fails to initialize, reinitialize
  providerPromise = providerPromise
    .catch(() => null)
    .then(_client => {
      if (_client) {
        return _client
      } else {
        return initClient({
          projectId: config.projectId,
          metadata: config.metadata,
        })
      }
    })
    .catch(e => {
      log({
        title: `WalletConnect Client Initialization Error`,
        message: e.message ? e.message : e,
        level: LEVELS.error,
      })
      throw e
    })

  const FclWcServicePlugin = makeServicePlugin(providerPromise, config)

  return {
    FclWcServicePlugin,
    providerPromise,
  }
}

// Returns the SignClient instance used by this plugin if it has been initialized
export async function getProvider() {
  return providerPromise.then(provider => {
    if (!provider) {
      throw new Error("WalletConnect client not initialized")
    }

    return provider
  })
}

export {SERVICE_PLUGIN_NAME} from "./constants"
