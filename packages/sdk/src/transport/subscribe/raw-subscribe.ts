import {config} from "@onflow/config"
import {SdkTransport} from "@onflow/typedefs"
import {getTransport} from "../get-transport"
import {invariant} from "@onflow/util-invariant"
import {SubscribeParams} from "./types"

/**
 * Subscribe to a topic without decoding the data.
 * @param params - The parameters for the subscription.
 * @param opts - Additional options for the subscription.
 * @returns A promise that resolves once the subscription is active.
 */
export async function rawSubscribe<T extends SdkTransport.SubscriptionTopic>(
  {topic, args, onData, onError}: SubscribeParams<T>,
  opts: {
    node?: string
    transport?: SdkTransport.Transport
  } = {}
) {
  const transport = await getTransport(opts)
  const node = opts?.node || (await config().get("accessNode.api"))

  invariant(
    !!node,
    `SDK Send Error: Either opts.node or "accessNode.api" in config must be defined.`
  )

  // Subscribe using the resolved transport
  return transport.subscribe(
    {
      topic,
      args,
      onData,
      onError,
    },
    {
      node,
      ...opts,
    }
  )
}
