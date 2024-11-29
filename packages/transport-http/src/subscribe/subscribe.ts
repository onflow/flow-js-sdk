import {SdkTransport} from "@onflow/typedefs"
import {SubscriptionManager} from "./subscription-manager"
import {blocksHandler} from "./handlers/blocks"
import {blockDigestsHandler} from "./handlers/block_digests"
import {blockHeaderHandler} from "./handlers/block-headers"

const SUBSCRIPTION_HANDLERS = [
  blocksHandler,
  blockDigestsHandler,
  blockHeaderHandler,
]

// Map of SubscriptionManager instances by access node URL
let subscriptionManagerMap: Map<
  string,
  SubscriptionManager<typeof SUBSCRIPTION_HANDLERS>
> = new Map()

export async function subscribe<T extends SdkTransport.SubscriptionTopic>(
  {
    topic,
    args,
    onData,
    onError,
  }: {
    topic: T
    args: SdkTransport.SubscriptionArguments<T>
    onData: (data: SdkTransport.SubscriptionData<T>) => void
    onError: (error: Error) => void
  },
  opts: {node: string}
): Promise<SdkTransport.Subscription> {
  // Get the SubscriptionManager instance for the access node, or create a new one
  const node = opts.node
  const manager =
    subscriptionManagerMap.get(node) ||
    new SubscriptionManager(SUBSCRIPTION_HANDLERS, {node})
  subscriptionManagerMap.set(node, manager)

  return manager.subscribe({
    topic,
    args,
    onData,
    onError,
  })
}
