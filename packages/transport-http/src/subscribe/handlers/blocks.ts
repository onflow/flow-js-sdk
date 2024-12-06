import {SdkTransport} from "@onflow/typedefs"
import {createSubscriptionHandler} from "./types"

type BlocksArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCKS>

type BlocksData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCKS>

type BlocksDataDto = {
  block: {
    id: string
    parent_id: string
    height: number
    timestamp: string
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

type BlocksArgsDto =
  | {
      block_status?: number
      start_block_id?: string
    }
  | {
      block_status?: number
      start_block_height?: number
    }

export const blocksHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.BLOCKS
  Args: BlocksArgs
  Data: BlocksData
  ArgsDto: BlocksArgsDto
  DataDto: BlocksDataDto
}>({
  topic: SdkTransport.SubscriptionTopic.BLOCKS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: BlocksArgs = {
      ...initialArgs,
    }

    return {
      onData(data: BlocksDataDto) {
        // Parse the raw data
        const parsedData: BlocksData = {
          block: {
            id: data.block.id,
            parentId: data.block.parent_id,
            height: data.block.height,
            timestamp: data.block.timestamp,
            collectionGuarantees: data.block.collection_guarantees.map(
              guarantee => ({
                collectionId: guarantee.collection_id,
                signerIds: guarantee.signer_ids,
              })
            ),
            blockSeals: data.block.block_seals.map(seal => ({
              blockId: seal.block_id,
              executionReceiptId: seal.result_id,
            })),
          },
        }

        // Update the resume args
        resumeArgs = {
          blockStatus: resumeArgs.blockStatus,
          startBlockHeight: data.block.height + 1,
        }

        onData(parsedData)
      },
      onError(error: Error) {
        onError(error)
      },
      argsToDto(args: BlocksArgs) {
        let encodedArgs: BlocksArgsDto = {
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
