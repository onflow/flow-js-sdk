import {SdkTransport, Transaction} from "@onflow/typedefs"
import {createSubscriptionHandler} from "./types"

const STATUS_MAP = {
  UNKNOWN: 0,
  PENDING: 1,
  FINALIZED: 2,
  EXECUTED: 3,
  SEALED: 4,
  EXPIRED: 5,
}

type TransactionStatusesArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES>

type TransactionStatusesData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES>

type TransactionStatusesArgsDto = {
  envelope_signatures: string[]
  payload_signatures: string[]
  authorizers: string[]
  payer: string
  proposer: string
  key_id: number
  gas_limit: number
  proposal_key: {
    key_id: number
    sequence_number: number
  }
  cadence: string
  reference_block_id: string
}

type TransactionStatusesDataDto = {
  transaction_status: {
    block_id: string
    block_height: number
    transaction_id: string
    status: string
    timestamp: string
    events: {
      type: string
      transaction_id: string
      transaction_index: string
      event_index: string
      payload: string
    }[]
  }
}

export const blockDigestsHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES
  Args: SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES>
  Data: SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES>
  ArgsDto: TransactionStatusesArgsDto
  DataDto: TransactionStatusesDataDto
}>({
  topic: SdkTransport.SubscriptionTopic.TRANSACTION_STATUSES,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: TransactionStatusesArgs = {
      ...initialArgs,
    }

    return {
      onData(data: TransactionStatusesDataModel) {
        // Parse the raw data
        const parsedData: TransactionStatusesData = {
          transactionStatus: {
            blockId: data.transaction_status.block_id,
            status:
              STATUS_MAP[data.transaction_status.status.toUpperCase()] || "",
            statusString: data.transaction_status.status.toUpperCase(),
            statusCode: data.transaction_status.status_code,
            errorMessage: data.transaction_status.error_message,
            events: data.transaction_status.events.map(event => ({
              type: event.type,
              transactionId: event.transaction_id,
              transactionIndex: Number(event.transaction_index),
              eventIndex: Number(event.event_index),
              payload: JSON.parse(
                context.Buffer.from(event.payload, "base64").toString()
              ),
            })),
          },
        }

        onData(parsedData)
      },
      onError(error: Error) {
        onError(error)
      },
      argsToDto(args: TransactionStatusesArgs) {
        return {
          envelope_signatures: args.envelopeSignatures,
          payload_signatures: args.payloadSignatures,
          authorizers: args.authorizers,
          payer: args.payer,
          proposer: args.proposer,
          key_id: args.keyId,
          gas_limit: args.gasLimit,
          proposal_key: {
            key_id: args.proposalKey.keyId,
            sequence_number: args.proposalKey.sequenceNumber,
          },
          cadence: args.script,
          reference_block_id: args.referenceBlockId,
        }
      },
      get connectionArgs() {
        return resumeArgs
      },
    }
  },
})
