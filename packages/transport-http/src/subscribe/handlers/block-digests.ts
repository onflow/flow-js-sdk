import {SdkTransport} from "@onflow/typedefs"
import {BlockArgsModel, createSubscriptionHandler} from "./types"

type BlockDigestArgsModel = BlockArgsModel

type BlockDigestDataModel = {
  // TODO: We do not know the data model types yet
  block_digest: {
    id: string
    height: number
    timestamp: string
  }
}

export const blockDigestsHandler = createSubscriptionHandler<{
  Topic: SdkTransport.SubscriptionTopic.BLOCK_DIGESTS
  Args: SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS>
  Data: SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS>
  ArgsModel: BlockDigestArgsModel
  DataModel: BlockDigestDataModel
}>({
  topic: SdkTransport.SubscriptionTopic.BLOCK_DIGESTS,
  createSubscriber: (initialArgs, onData, onError) => {
    let resumeArgs: SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS> =
      {
        ...initialArgs,
      }

    return {
      sendData(data: BlockDigestDataModel) {
        // Parse the raw data
        const parsedData: SdkTransport.SubscriptionData<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS> =
          {
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
      sendError(error: Error) {
        onError(error)
      },
      encodeArgs(
        args: SdkTransport.SubscriptionArguments<SdkTransport.SubscriptionTopic.BLOCK_DIGESTS>
      ) {
        let encodedArgs: BlockArgsModel = {
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
