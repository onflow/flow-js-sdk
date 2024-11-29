import {Block} from ".."

type SchemaItem<TArgs, TData> = {
  args: TArgs
  data: TData
}

export enum SubscriptionTopic {
  BLOCKS = "blocks",
}

export type SubscriptionSchema = {
  [SubscriptionTopic.BLOCKS]: SchemaItem<
    {
      block_status?: number
    } & (
      | {
          start_block_id?: string
        }
      | {
          start_block_height?: number
        }
    ),
    {
      block: Block
    }
  >
}

export type SubscriptionArguments<T extends SubscriptionTopic> =
  SubscriptionSchema[T]["args"]
export type SubscriptionData<T extends SubscriptionTopic> =
  SubscriptionSchema[T]["data"]

export type Subscription = {
  unsubscribe: () => void
}

export type SubscribeFn = <T extends SubscriptionTopic>(
  params: {
    topic: T
    args: SubscriptionArguments<T>
    onData: (data: SubscriptionData<T>) => void
    onError: (error: Error) => void
  },
  opts: {node: string}
) => Promise<Subscription>
