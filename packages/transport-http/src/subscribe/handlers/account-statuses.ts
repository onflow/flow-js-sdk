import {SdkTransport} from "@onflow/typedefs"
import {createSubscriptionHandler} from "./types"
import {EventsArgsDto} from "./events"

type AccountStatusesArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES>

type AccountStatusesData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES>

type AccountStatusesArgsDto = EventsArgsDto

type AccountStatusesDataDto = {
  // TODO: We do not know the data model types yet
  account_status: {
    block_id: string
    height: number
    account_events: {
      block_id: string
      block_height: number
      block_timestamp: string
      type: string
      transaction_id: string
      transaction_index: number
      event_index: number
      payload: string
    }[]
  }
}

export const accountStatusesHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES
  Args: SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES>
  Data: SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES>
  ArgsDto: AccountStatusesArgsDto
  DataDto: AccountStatusesDataDto
}>({
  topic: SdkTransport.SubscriptionTopic.ACCOUNT_STATUSES,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: AccountStatusesArgs = {
      ...initialArgs,
    }

    return {
      onData(data: AccountStatusesDataDto) {
        // Parse the raw data
        const parsedData: AccountStatusesData = {
          accountStatus: {
            blockId: data.account_status.block_id,
            height: data.account_status.height,
            accountEvents: data.account_status.account_events.map(event => ({
              blockId: event.block_id,
              blockHeight: event.block_height,
              blockTimestamp: event.block_timestamp,
              type: event.type,
              transactionId: event.transaction_id,
              transactionIndex: event.transaction_index,
              eventIndex: event.event_index,
              payload: event.payload,
            })),
          },
        }

        // Update the resume args
        resumeArgs = {
          ...resumeArgs,
          startBlockHeight: data.account_status.height + 1,
          startBlockId: undefined,
        }

        onData(parsedData)
      },
      onError(error: Error) {
        onError(error)
      },
      argsToDto(args: AccountStatusesArgs) {
        let encodedArgs: AccountStatusesArgsDto = {
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
