import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from "@wagmi/core"
import {
  type Address,
  type ProviderConnectInfo,
  ProviderDisconnectedError,
  SwitchChainError,
  getAddress,
  numberToHex,
} from "viem"
import {createProvider} from "@onflow/fcl-ethereum-provider"

type FclWagmiAdapterParams = Parameters<typeof createProvider>[0]

export function fclWagmiAdapter(params: FclWagmiAdapterParams) {
  type Provider = ReturnType<typeof createProvider>
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
  }
  let provider: Provider | undefined

  let accountsChanged: Connector["onAccountsChanged"] | undefined
  let chainChanged: Connector["onChainChanged"] | undefined
  let connect: Connector["onConnect"] | undefined
  let disconnect: ((error: Error) => void) | undefined

  // Parse and validate service parameters
  const id = params.service?.uid || "fcl"
  const name = params.service?.provider?.name || "Cadence Wallet"

  // TODO: we need to surface this through FCL service configuration
  const rdns = (params.service?.provider as any)?.rdns

  return createConnector<Provider, Properties>(config => ({
    id: id,
    name: name,
    type: "fcl-wagmi-adapter",
    rdns: rdns,
    async setup() {
      const provider = await this.getProvider()

      if (connect) provider.removeListener("connect", connect)
      connect = this.onConnect.bind(this)
      provider.on("connect", connect)

      // We shouldn't need to listen for `'accountsChanged'` here since the `'connect'` event should suffice (and wallet shouldn't be connected yet).
      // Some wallets, like MetaMask, do not implement the `'connect'` event and overload `'accountsChanged'` instead.
      if (!accountsChanged) {
        accountsChanged = this.onAccountsChanged.bind(this)
        provider.on("accountsChanged", accountsChanged)
      }
    },
    async connect({isReconnecting}: any = {}) {
      const provider = await this.getProvider()

      let accounts: readonly Address[]
      if (isReconnecting) {
        accounts = await this.getAccounts()
      } else {
        accounts = (
          (await provider.request({
            method: "eth_requestAccounts",
          })) as string[]
        ).map(x => getAddress(x))
      }

      // Manage EIP-1193 event listeners
      // https://eips.ethereum.org/EIPS/eip-1193#events
      if (connect) provider.removeListener("connect", connect)
      connect = this.onConnect.bind(this)
      provider.on("connect", connect)

      if (accountsChanged)
        provider.removeListener("accountsChanged", accountsChanged)
      accountsChanged = this.onAccountsChanged.bind(this)
      provider.on("accountsChanged", accountsChanged)

      if (chainChanged) provider.removeListener("chainChanged", chainChanged)
      chainChanged = this.onChainChanged.bind(this)
      provider.on("chainChanged", chainChanged)

      if (disconnect) provider.removeListener("disconnect", disconnect)
      disconnect = (error: Error) => {
        throw new ProviderDisconnectedError(error)
      }
      provider.on("disconnect", disconnect)

      return {accounts, chainId: await this.getChainId()}
    },
    async disconnect() {
      const provider = await this.getProvider()

      // Manage EIP-1193 event listeners
      if (chainChanged) provider.removeListener("chainChanged", chainChanged)
      chainChanged = undefined

      if (disconnect) provider.removeListener("disconnect", disconnect)
      disconnect = undefined

      if (connect) provider.removeListener("connect", connect)
      connect = this.onConnect.bind(this)
      provider.on("connect", connect)

      await provider.disconnect()
    },
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[]
      return accounts.map(x => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request({method: "eth_chainId"})
      return Number(chainId)
    },
    async getProvider() {
      return provider ?? (provider = createProvider(params))
    },
    async isAuthorized() {
      // TODO: There may be an issue here if a user without a COA refreshes the page
      // We should instead be checking whether FCL itself is authorized
      const accounts = await this.getAccounts()
      return accounts.length > 0
    },
    async switchChain({addEthereumChainParameter, chainId}: any) {
      const provider = await this.getProvider()

      const chain = config.chains.find(x => x.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{chainId: numberToHex(chainId)}],
        })

        return chain
      } catch (err) {
        // TODO: Error handling
        throw new SwitchChainError(err as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit("change", {
          accounts: accounts.map((x: any) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit("change", {chainId})
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts()

      // TODO: What to do if accounts is empty? not sure this is accurate
      if (accounts.length === 0) return

      const chainId = Number(connectInfo.chainId)
      config.emitter.emit("connect", {accounts, chainId})

      const provider = await this.getProvider()

      if (connect) provider.removeListener("connect", connect)
      connect = undefined

      if (accountsChanged)
        provider.removeListener("accountsChanged", accountsChanged)
      accountsChanged = this.onAccountsChanged.bind(this)
      provider.on("accountsChanged", accountsChanged)

      if (chainChanged) provider.removeListener("chainChanged", chainChanged)
      chainChanged = this.onChainChanged.bind(this)
      provider.on("chainChanged", chainChanged)

      if (disconnect) provider.removeListener("disconnect", disconnect)
      disconnect = (error: Error) => {
        throw new ProviderDisconnectedError(error)
      }
      provider.on("disconnect", disconnect)
    },
    // TODO: waht to do with error?
    async onDisconnect(error) {
      const provider = await this.getProvider()

      config.emitter.emit("disconnect")

      // Manage EIP-1193 event listeners
      if (chainChanged) {
        provider.removeListener("chainChanged", chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener("disconnect", disconnect)
        disconnect = undefined
      }
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on("connect", connect)
      }
    },
    onDisplayUri(uri: string) {
      config.emitter.emit("message", {type: "display_uri", data: uri})
    },
  }))
}
