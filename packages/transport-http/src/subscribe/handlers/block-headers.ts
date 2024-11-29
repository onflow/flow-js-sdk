import {SdkTransport} from "@onflow/typedefs"
import {BlockArgsModel, createSubscriptionHandler} from "./types"

type BlockHeaderArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_HEADERS>

type BlockHeaderData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCK_HEADERS>

type BlockHeaderArgsModel = BlockArgsModel

type BlockHeaderDataModel = {
  // TODO: We do not know the data model types yet
  header: {
    id: string
    height: number
    timestamp: string
    chain_id: string
    parent_id: string
    collection_guarantees: {
      collection_id: string
      signer_ids: string[]
    }[]
    block_seals: {
      block_id: string
      result_id: string
    }[]
  }
}

export const blockHeaderHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.BLOCK_HEADERS
  Args: BlockHeaderArgs
  Data: BlockHeaderData
  ArgsModel: BlockHeaderArgsModel
  DataModel: BlockHeaderDataModel
}>({
  topic: SdkTransport.SubscriptionTopic.BLOCK_HEADERS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: BlockHeaderArgs = {
      ...initialArgs,
    }

    return {
      sendData(data: BlockHeaderDataModel) {
        // Parse the raw data
        const parsedData: BlockHeaderData = {
          // TODO: We do not know the data model types yet
          blockHeader: {
            id: data.header.id,
            height: data.header.height,
            timestamp: data.header.timestamp,
            chainId: data.header.chain_id,
          } as any,
        }

        // Update the resume args
        resumeArgs = {
          blockStatus: resumeArgs.blockStatus,
          startBlockHeight: data.header.height + 1,
        }

        onData(parsedData)
      },
      sendError(error: Error) {
        onError(error)
      },
      encodeArgs(args: BlockHeaderArgs) {
        let encodedArgs: BlockHeaderArgsModel = {
          block_status: args.blockStatus,
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
