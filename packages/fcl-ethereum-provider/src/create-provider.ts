import * as fcl from "@onflow/fcl"
import {Eip1193Provider} from "./types/provider"
import {FclEthereumProvider} from "./provider"
import {RpcProcessor} from "./rpc/rpc-processor"
import {Service} from "@onflow/typedefs"
import {EventDispatcher} from "./events/event-dispatcher"
import {AccountManager} from "./accounts/account-manager"
import {FLOW_CHAINS} from "./constants"
import {Gateway} from "./gateway/gateway"
import {NetworkManager} from "./network/network-manager"

export type FclProviderConfig = {
  user: typeof fcl.currentUser
  config: typeof fcl.config
  service?: Service
  gateway?: string
  rpcUrls?: {[chainId: string]: number}
}

/**
 * Create a new FCL Ethereum provider
 * @param config - Configuration object
 * @param config.user - The current user
 * @param config.service - The service
 * @param config.gateway - The gateway
 * @returns The provider
 * @public
 * @example
 * ```javascript
 * import {createProvider} from "@onflow/fcl-ethereum-provider"
 *
 * const provider = createProvider({
 *  user: fcl.currentUser,
 *  service: fcl.service,
 *  gateway: "http://localhost:8080",
 * })
 * ```
 */
export function createProvider(config: FclProviderConfig): Eip1193Provider {
  const defaultRpcUrls = Object.values(FLOW_CHAINS).reduce(
    (acc, chain) => {
      acc[chain.eip155ChainId] = chain.publicRpcUrl
      return acc
    },
    {} as {[chainId: number]: string}
  )

  const networkManager = new NetworkManager(config.config)
  const accountManager = new AccountManager(
    config.user,
    networkManager,
    config.service
  )
  const gateway = new Gateway({
    ...defaultRpcUrls,
    ...(config.rpcUrls || {}),
  })
  const rpcProcessor = new RpcProcessor(gateway, accountManager, networkManager)
  const eventProcessor = new EventDispatcher(accountManager, networkManager)
  const provider = new FclEthereumProvider(
    accountManager,
    rpcProcessor,
    eventProcessor
  )

  return provider
}
