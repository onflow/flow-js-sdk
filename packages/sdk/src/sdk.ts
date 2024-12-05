import * as logger from "@onflow/util-logger"
// Base
export {build} from "./build/build.js"
export {resolve} from "./resolve/resolve.js"
export {send, subscribe, rawSubscribe} from "./transport"
export {decode} from "./decode/sdk-decode.js"
export {
  encodeTransactionPayload,
  encodeTransactionEnvelope,
  encodeTxIdFromVoucher,
} from "./encode/encode"

// Utils
export {
  interaction, // deprecated
  initInteraction,
  isOk,
  isBad,
  why,
  pipe,
  get,
  put,
  update,
  destroy,
  isUnknown,
  isScript,
  isTransaction,
  isGetTransaction,
  isGetTransactionStatus,
  isGetAccount,
  isGetEvents,
  isPing,
  isGetBlock,
  isGetBlockHeader,
  isGetCollection,
  isGetNetworkParameters,
  isGetNodeVersionInfo,
} from "./interaction/interaction"
import type {CadenceArgument} from "./interaction/interaction"
export {CadenceArgument} // Workaround for babel https://github.com/babel/babel/issues/8361

export {createSignableVoucher, voucherToTxId} from "./resolve/voucher"
export {encodeMessageFromSignable} from "./wallet-utils/encode-signable.js"
export {template as cadence} from "@onflow/util-template"
export {template as cdc} from "@onflow/util-template"

// Helpers
export {account} from "./account/account.js"
export {block} from "./block/block.js"
export {nodeVersionInfo} from "./node-version-info/node-version-info"

// Builders
export {authorizations, authorization} from "./build/build-authorizations.js"
export {atBlockHeight} from "./build/build-at-block-height.js"
export {atBlockId} from "./build/build-at-block-id.js"
export {getAccount} from "./build/build-get-account.js"
export {getEvents} from "./build/build-get-events.js"
export {getEventsAtBlockHeightRange} from "./build/build-get-events-at-block-height-range.js"
export {getEventsAtBlockIds} from "./build/build-get-events-at-block-ids"
export {getBlock} from "./build/build-get-block.js"
export {getBlockHeader} from "./build/build-get-block-header.js"
export {getCollection} from "./build/build-get-collection"
export {getTransactionStatus} from "./build/build-get-transaction-status.js"
export {getTransaction} from "./build/build-get-transaction.js"
export {getNetworkParameters} from "./build/build-get-network-parameters.js"
export {getNodeVersionInfo} from "./build/build-get-node-version-info"
export {limit} from "./build/build-limit.js"
export {args, arg} from "./build/build-arguments"
export {proposer} from "./build/build-proposer.js"
export {payer} from "./build/build-payer.js"
export {ping} from "./build/build-ping.js"
export {ref} from "./build/build-ref.js"
export {script} from "./build/build-script.js"
export {transaction} from "./build/build-transaction.js"
export {validator} from "./build/build-validator.js"
export {invariant} from "./build/build-invariant.js"
export {voucherIntercept} from "./build/build-voucher-intercept.js"
export {subscribeEvents} from "./build/build-subscribe-events"

// Resolvers
export {resolveCadence} from "./resolve/resolve-cadence.js"
export {resolveFinalNormalization} from "./resolve/resolve-final-normalization"
export {resolveProposerSequenceNumber} from "./resolve/resolve-proposer-sequence-number"
export {resolveArguments} from "./resolve/resolve-arguments.js"
export {resolveAccounts} from "./resolve/resolve-accounts"
export {response} from "./response/response"
export {resolveSignatures} from "./resolve/resolve-signatures"
export {resolveValidators} from "./resolve/resolve-validators.js"
export {resolveRefBlockId} from "./resolve/resolve-ref-block-id.js"
export {resolveVoucherIntercept} from "./resolve/resolve-voucher-intercept.js"

export {config} from "@onflow/config"

// Deprecated
export const params = (params: never) =>
  logger.log.deprecate({
    pkg: "FCL/SDK",
    message: `The params builder has been removed from the Flow JS-SDK/FCL.`,
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/sdk/TRANSITIONS.md#0001-deprecate-params",
    level: logger.LEVELS.error,
  })
export const param = (params: never) =>
  logger.log.deprecate({
    pkg: "FCL/SDK",
    message: `The param builder has been removed from the Flow JS-SDK/FCL.`,
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/sdk/TRANSITIONS.md#0001-deprecate-params",
    level: logger.LEVELS.error,
  })

import * as TestUtils from "./test-utils"
export {TestUtils}

export {VERSION} from "./VERSION"
