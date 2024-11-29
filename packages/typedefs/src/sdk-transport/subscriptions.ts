import {Block, BlockDigest, Event, EventFilter} from ".."

export type SubscriptionSchema = {
  [SubscriptionTopic.BLOCKS]: SchemaItem<
    BlockArgs,
    {
      block: Block
    }
  >
  [SubscriptionTopic.BLOCK_DIGESTS]: SchemaItem<
    BlockArgs,
    {
      blockDigest: BlockDigest
    }
  >
  [SubscriptionTopic.ACCOUNT_STATUSES]: SchemaItem<
    {
      accountStatusFilter: EventFilter
    },
    {
      // TODO: We do not know the data model types yet
      accountStatus: {
        blockId: string
        height: number
        account_events: Event[]
      }
    }
  >
}

export enum SubscriptionTopic {
  BLOCKS = "blocks",
  BLOCK_DIGESTS = "block_digests",
  ACCOUNT_STATUSES = "account_statuses",
}

type BlockArgs =
  | {
      blockStatus?: number
      startBlockId?: string
    }
  | {
      blockStatus?: number
      startBlockHeight?: number
    }

type SchemaItem<TArgs, TData> = {
  args: TArgs
  data: TData
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
