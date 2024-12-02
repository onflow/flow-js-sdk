import {SdkTransport} from "@onflow/typedefs"
import {BlockArgsModel, createSubscriptionHandler} from "./types"

type BlockHeadersArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_HEADERS>

type BlockHeadersData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCK_HEADERS>

type BlockHeadersArgsDto = BlockArgsModel

type BlockHeadersDataDto = {
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

export const blockHeadersHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.BLOCK_HEADERS
  Args: BlockHeadersArgs
  Data: BlockHeadersData
  ArgsDto: BlockHeadersArgsDto
  DataDto: BlockHeadersDataDto
}>({
  topic: SdkTransport.SubscriptionTopic.BLOCK_HEADERS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: BlockHeadersArgs = {
      ...initialArgs,
    }

    return {
      onData(data: BlockHeadersDataDto) {
        // Parse the raw data
        const parsedData: BlockHeadersData = {
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
      onError(error: Error) {
        onError(error)
      },
      argsToDto(args: BlockHeadersArgs) {
        let encodedArgs: BlockHeadersArgsDto = {
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
