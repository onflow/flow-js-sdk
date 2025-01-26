import {SdkTransport} from "@onflow/typedefs"
import {BlockArgsModel, createSubscriptionHandler} from "./types"

type BlockDigestsArgs =
  SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS>

type BlockDigestsData =
  SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS>

type BlockDigestsDataDto = {
  // TODO: We do not know the data model types yet
  block_digest: {
    id: string
    height: number
    timestamp: string
  }
}

type BlockDigestsArgsDto = BlockArgsModel

export const blockDigestsHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.BLOCK_DIGESTS
  Args: BlockDigestsArgs
  Data: BlockDigestsData
  ArgsDto: BlockDigestsArgsDto
  DataDto: BlockDigestsDataDto
}>({
  topic: SdkTransport.SubscriptionTopic.BLOCK_DIGESTS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: BlockDigestsArgs = {
      ...initialArgs,
    }

    return {
      onData(data: BlockDigestsDataDto) {
        // Parse the raw data
        const parsedData: BlockDigestsData = {
          blockDigest: {
            id: data.block_digest.id,
            height: data.block_digest.height,
            timestamp: data.block_digest.timestamp,
          },
        }

        // Update the resume args
        resumeArgs = {
          blockStatus: resumeArgs.blockStatus,
          startBlockId: data.block_digest.id + 1,
        }

        onData(parsedData)
      },
      onError(error: Error) {
        onError(error)
      },
      argsToDto(args: BlockDigestsArgs) {
        let encodedArgs: BlockDigestsArgsDto = {
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
