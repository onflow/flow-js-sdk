import {SdkTransport} from "@onflow/typedefs"

export type SubscribeParams<T extends SdkTransport.SubscriptionTopic> = {
  topic: T
  args: SdkTransport.SubscriptionArguments<T>
  onData: (data: SdkTransport.SubscriptionData<T>) => void
  onError: (error: Error) => void
}
