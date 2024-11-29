import {SdkTransport} from "@onflow/typedefs"
import {createSubscriptionHandler} from "./types"

type EventsArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.EVENTS>

type EventsData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.EVENTS>

type EventsArgsModel = (
  | {
      start_block_id: string
    }
  | {
      start_block_height: number
    }
  | {}
) & {
  event_types?: string[]
  addresses?: string[]
  contracts?: string[]
}

type EventsDataModel = {
  block_id: string
  block_height: number
  block_timestamp: string
  type: string
  transaction_id: string
  transaction_index: number
  event_index: number
  payload: string
}

export const eventsHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.EVENTS
  Args: EventsArgs
  Data: EventsData
  ArgsModel: EventsArgsModel
  DataModel: EventsDataModel
}>({
  topic: SdkTransport.SubscriptionTopic.EVENTS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: EventsArgs = {
      ...initialArgs,
    }

    return {
      sendData(rawData: EventsDataModel) {
        // Parse the raw data
        const result: EventsData = {
          event: {
            blockId: rawData.block_id,
            blockHeight: rawData.block_height,
            blockTimestamp: rawData.block_timestamp,
            type: rawData.type,
            transactionId: rawData.transaction_id,
            transactionIndex: rawData.transaction_index,
            eventIndex: rawData.event_index,
            payload: rawData.payload,
          },
        }

        // Update the resume args
        resumeArgs = {
          ...resumeArgs,
          startBlockHeight: result.event.blockHeight + 1,
          startBlockId: undefined,
        }

        onData(result)
      },
      sendError(error: Error) {
        onError(error)
      },
      encodeArgs(args: EventsArgs) {
        let encodedArgs: EventsArgsModel = {
          event_types: args.filter?.eventTypes,
          addresses: args.filter?.addresses,
          contracts: args.filter?.contracts,
        }

        if ("startBlockHeight" in args) {
          return {
            ...encodedArgs,
            start_block_height: args.startBlockHeight,
          }
        }

        if ("startBlockId" in args) {
          return {
            ...encodedArgs,
            start_block_id: args.startBlockId,
          }
        }

        return encodedArgs
      },
      get connectionArgs() {
        return resumeArgs
      },
    }
  },
})
