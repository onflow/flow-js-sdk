import * as fcl from "@onflow/fcl"
import {Eip1193Provider} from "./types/provider"
import {FclEthereumProvider} from "./provider"
import {RpcProcessor} from "./rpc/rpc-processor"
import {Service} from "@onflow/typedefs"
import {EventDispatcher} from "./events/event-dispatcher"
import {AccountManager} from "./accounts/account-manager"

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
export function createProvider(config: {
  user: typeof fcl.currentUser
  service?: Service
  gateway?: string
}): Eip1193Provider {
  const accountManager = new AccountManager(config.user)
  const rpcProcessor = new RpcProcessor()
  const eventProcessor = new EventDispatcher()
  const provider = new FclEthereumProvider(rpcProcessor, eventProcessor)
  return provider
}
