import * as fcl from "@onflow/fcl"
import * as rlp from "@onflow/rlp"
import {
  CompositeSignature,
  CurrentUser,
  Service,
  FvmErrorCode,
} from "@onflow/typedefs"
import {
  DEFAULT_EVM_GAS_LIMIT,
  EVENT_IDENTIFIERS,
  EventType,
  FlowNetwork,
} from "../constants"
import {
  BehaviorSubject,
  concat,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from "../util/observable"
import {EthSignatureResponse} from "../types/eth"
import {NetworkManager} from "../network/network-manager"
import {
  createCOATx,
  getCOAScript,
  getNonceScript,
  sendTransactionTx,
} from "../cadence"
import {TransactionError} from "@onflow/fcl"
import {displayErrorNotification} from "../notifications"
import {AddressStoreState} from "../types/account"
import {getFlowNetwork} from "../util/chain"
import {precalculateTxHash} from "../util/transaction"

export class AccountManager {
  private $addressStore = new BehaviorSubject<AddressStoreState>({
    isLoading: true,
    address: null,
    error: null,
  })

  constructor(
    private user: typeof fcl.currentUser,
    private networkManager: NetworkManager,
    private service?: Service
  ) {
    this.initializeUserSubscription()
  }

  /**
   * Subscribes to the current user observable and updates the address store.
   */
  private initializeUserSubscription() {
    const $user = new Observable<CurrentUser>(subscriber => {
      return this.user.subscribe((currentUser: CurrentUser, error?: Error) => {
        if (error) {
          subscriber.error?.(error)
        } else {
          subscriber.next(currentUser)
        }
      }) as Subscription
    })

    $user
      .pipe(
        // Only listen bind to users matching the current authn service
        map(snapshot => {
          const addr = snapshot?.addr || null
          if (!addr) {
            return null
          }

          const authnService = snapshot?.services?.find(
            service => service.type === "authn"
          )
          const matchingAuthnService = authnService?.uid === this.service?.uid
          return matchingAuthnService ? addr : null
        }),
        distinctUntilChanged(),
        switchMap(addr =>
          concat(
            of({isLoading: true} as AddressStoreState),
            from(
              (async () => {
                try {
                  if (!addr) {
                    return {isLoading: false, address: null, error: null}
                  }
                  return {
                    isLoading: false,
                    address: await this.fetchCOAFromFlowAddress(addr),
                    error: null,
                  }
                } catch (error: any) {
                  return {isLoading: false, address: null, error}
                }
              })()
            )
          )
        )
      )
      .subscribe(this.$addressStore)
  }

  public async authenticate(): Promise<string[]> {
    await this.user.authenticate({service: this.service, forceReauth: true})
    return this.getAccounts()
  }

  public async unauthenticate(): Promise<void> {
    await this.user.unauthenticate()
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  private async waitForTxResult(
    txId: string,
    eventType: string,
    errorMsg: string = `${eventType} event not found`
  ): Promise<any> {
    const txResult = await fcl.tx(txId).onceExecuted()

    const event = txResult.events.find(e => e.type === eventType)
    if (!event) {
      throw new Error(errorMsg)
    }
    return event
  }

  private async fetchCOAFromFlowAddress(flowAddr: string): Promise<string> {
    const chainId = await this.networkManager.getChainId()
    if (!chainId) {
      throw new Error("No active chain")
    }

    return await fcl.query({
      cadence: getCOAScript(chainId),
      args: (arg: typeof fcl.arg, t: typeof fcl.t) => [
        arg(flowAddr, t.Address),
      ],
    })
  }

  public async getCOAAddress(): Promise<string | null> {
    const {address, error} = await firstValueFrom(
      this.$addressStore.pipe(filter(x => !x.isLoading))
    )
    if (error) {
      throw error
    }
    return address || null
  }

  public async getAccounts(): Promise<string[]> {
    const coaAddress = await this.getCOAAddress()
    return coaAddress ? [coaAddress] : []
  }

  /**
   * Get the COA address and create it if it doesn't exist
   */
  public async getAndCreateAccounts(chainId: number): Promise<string[]> {
    const accounts = await this.getAccounts()

    if (accounts.length === 0) {
      const coaAddress = await this.createCOA(chainId)
      return [coaAddress]
    }

    if (accounts.length === 0) {
      throw new Error("COA address is still missing after creation.")
    }

    return accounts
  }

  public async createCOA(chainId: number): Promise<string> {
    const flowNetwork = this.getFlowNetworkOrThrow(chainId)
    await this.validateChainId(chainId)

    const txId = await fcl.mutate({
      cadence: createCOATx(chainId),
      limit: 9999,
      authz: this.user,
    })

    const txResult = await fcl.tx(txId).onceExecuted()

    if (txResult.statusCode == 0) {
      const txErr = TransactionError.fromErrorMessage(txResult.errorMessage)

      if (txErr && txErr.code === FvmErrorCode.STORAGE_CAPACITY_EXCEEDED) {
        displayErrorNotification(
          "Storage Error",
          "Your wallet does not have enough funds to cover storage costs. Please add more funds."
        )

        throw new Error("Insufficient funds to cover storage costs.")
      }

      throw new Error(`Transaction failed: ${txErr.message}`)
    }

    const event = await this.waitForTxResult(
      txId,
      EVENT_IDENTIFIERS[EventType.CADENCE_OWNED_ACCOUNT_CREATED][flowNetwork],
      "Failed to create COA: COACreated event not found"
    )

    const coaAddress = event.data.address
    if (!coaAddress) {
      throw new Error("COA created event did not include an address")
    }

    this.$addressStore.next({
      isLoading: false,
      address: coaAddress,
      error: null,
    })

    return coaAddress
  }

  public subscribe(callback: (accounts: string[]) => void): Subscription {
    return this.$addressStore
      .pipe(filter(x => !x.isLoading && !x.error))
      .subscribe(({address}) => {
        callback(address ? [address] : [])
      })
  }

  /**
   * Fetch the current nonce from the EVM contract via a Cadence script.
   */
  private async getNonce(evmAddress: string): Promise<string> {
    const chainId = await this.networkManager.getChainId()

    if (!chainId) {
      throw new Error("No active chain")
    }

    const nonce = await fcl.query({
      cadence: getNonceScript(chainId),
      args: (arg, t) => [arg(evmAddress, t.String)],
    })

    return nonce.toString()
  }

  async sendTransaction(params: {
    to: string
    from: string
    chainId: string
    value?: string
    gas?: string
    data?: string
  }) {
    const {
      to,
      from,
      value = "0",
      data = "",
      gas = DEFAULT_EVM_GAS_LIMIT,
      chainId,
    } = params

    const parsedChainId = parseInt(chainId)
    this.getFlowNetworkOrThrow(parsedChainId)
    await this.validateChainId(parsedChainId)

    // Check if the from address matches the authenticated COA address
    const expectedCOAAddress = await this.getCOAAddress()
    if (
      fcl.sansPrefix(from.toLowerCase()) !==
        fcl.sansPrefix(expectedCOAAddress?.toLowerCase() || null) &&
      !!expectedCOAAddress
    ) {
      throw new Error(
        `From address does not match authenticated user address.\nUser: ${expectedCOAAddress}\nFrom: ${from}`
      )
    }

    // ----- Pre-calculate the transaction hash -----
    const evmAddress = fcl.sansPrefix(expectedCOAAddress!).toLowerCase()
    const nonceStr = await this.getNonce(evmAddress)
    const nonce = parseInt(nonceStr, 10)
    const preCalculatedTxHash = precalculateTxHash(
      nonce,
      gas,
      value,
      to,
      data,
      evmAddress
    )
    // ----- End pre-calculation -----

    await fcl.mutate({
      cadence: sendTransactionTx(parsedChainId),
      limit: 9999,
      args: (arg: typeof fcl.arg, t: typeof fcl.t) => [
        arg(fcl.sansPrefix(to), t.String),
        arg(fcl.sansPrefix(data), t.String),
        arg(BigInt(gas).toString(), t.UInt64),
        arg(BigInt(value).toString(), t.UInt),
      ],
      authz: this.user,
    })

    return preCalculatedTxHash
  }

  public async signMessage(
    message: string,
    from: string
  ): Promise<EthSignatureResponse> {
    const coaAddress = await this.getCOAAddress()
    if (!coaAddress) {
      throw new Error(
        "COA address is not available. User might not be authenticated."
      )
    }

    if (
      fcl.sansPrefix(from).toLowerCase() !==
      fcl.sansPrefix(coaAddress).toLowerCase()
    ) {
      throw new Error("Signer address does not match authenticated COA address")
    }

    try {
      const response: CompositeSignature[] = await this.user.signUserMessage(
        fcl.sansPrefix(message)
      )

      if (!response || response.length === 0) {
        throw new Error("Failed to sign message")
      }

      const keyIndices = response.map(sig => sig.keyId)
      const signatures = response.map(sig => sig.signature)

      const addressHexArray = Buffer.from(fcl.sansPrefix(from), "hex")

      const capabilityPath = "/public/evm"

      const rlpEncodedProof = rlp
        .encode([keyIndices, addressHexArray, capabilityPath, signatures])
        .toString("hex")

      return fcl.withPrefix(rlpEncodedProof)
    } catch (error) {
      throw error
    }
  }

  /**
   * Validates that the provided chain ID matches the current network.
   */
  private async validateChainId(chainId: number): Promise<void> {
    const currentChainId = await this.networkManager.getChainId()
    if (chainId !== currentChainId) {
      throw new Error(
        `Chain ID does not match the current network. Expected: ${currentChainId}, Received: ${chainId}`
      )
    }
  }

  /**
   * Gets the Flow network based on the chain ID or throws an error.
   */
  private getFlowNetworkOrThrow(chainId: number): FlowNetwork {
    const flowNetwork = getFlowNetwork(chainId)
    if (!flowNetwork) {
      throw new Error("Flow network not found for chain ID")
    }
    return flowNetwork
  }
}
