export type Account = {
  /**
   * - The address of the account
   */
  address: string
  /**
   * - The FLOW balance of the account in 10^8
   */
  balance: number
  /**
   * - The code of any Cadence contracts stored in the account
   */
  code: number
  /**
   * - Any contracts deployed to this account
   */
  contracts: Record<string, string>
  /**
   * - The keys associated with the account
   */
  keys: Array<AccountKey>
}

export type AccountKey = {
  /**
   * - The index of the key in the account
   */
  index: number
  /**
   * - The public key of the account key
   */
  publicKey: string
  /**
   * - The signature algorithm used by the key
   */
  signAlgo: SignatureAlgorithm
  /**
   * - The signature algorithm used by the key as a string
   */
  signAlgoString: string
  /**
   * - The hashing algorithm used by the key
   */
  hashAlgo: HashAlgorithm
  /**
   * - The hashing algorithm used by the key as a string
   */
  hashAlgoString: string
  /**
   * - The sequence number of the key
   */
  sequenceNumber: number
  /**
   * - The weight of the key
   */
  weight: number
  /**
   * - Whether or not the key has been revoked
   */
  revoked: boolean
}

export enum SignatureAlgorithm {
  ECDSA_P256 = 1,
  ECDSA_secp256k1 = 2,
  BLS_BLS12_381 = 3,
}

export enum HashAlgorithm {
  SHA2_256 = 1,
  SHA2_384 = 2,
  SHA3_256 = 3,
  SHA3_384 = 4,
  KMAC128_BLS_BLS12_381 = 5,
}

export type Block = {
  /**
   * - The id of the block
   */
  id: string
  /**
   * - The id of the parent block
   */
  parentId: string
  /**
   * - The height of the block
   */
  height: number
  /**
   * - Time related fields
   */
  timestamp: string
  /**
   * - Contains the ids of collections included in the block
   */
  collectionGuarantees: Array<CollectionGuarantee>
  /**
   * - The details of which nodes executed and sealed the blocks
   */
  blockSeals: Array<BlockSeal>
}
export type CollectionGuarantee = {
  /**
   * - The id of the block
   */
  collectionId: string
  /**
   * - The signer ids of the block
   */
  signerIds: Array<string>
}
export type BlockSeal = {
  /**
   * - The id of the block
   */
  blockId: string
  /**
   * - The execution receipt id of the block
   */
  executionReceiptId: string
}
/**
 * BlockDigest holds lightweight block information which includes only block id, block height and block timestamp.
 */
export type BlockDigest = {
  /**
   * - The id of the block
   */
  id: string
  /**
   * - The height of the block
   */
  height: number
  /**
   * - Timestamp of the block
   */
  timestamp: string
}
export type CompositeSignature = {
  /**
   * - A type identifier used internally by FCL
   */
  f_type: string
  /**
   * - FCL protocol version
   */
  f_vsn: string
  /**
   * - Flow Address (sans prefix)
   */
  addr: string
  /**
   * - Key ID
   */
  keyId: number
  /**
   * - Signature as a hex string
   */
  signature: string
}
export type CurrentUser = {
  /**
   * - The public address of the current user
   */
  addr?: string
  /**
   * - A wallet specified content identifier for user metadata
   */
  cid?: string
  /**
   * - A wallet specified time-frame for a valid session
   */
  expiresAt?: number
  /**
   * - A type identifier used internally by FCL
   */
  f_type: string
  /**
   * - FCL protocol version
   */
  f_vsn: string
  /**
   * - Whether or not the current user is logged in
   */
  loggedIn?: boolean
  /**
   * - A list of trusted services that express ways of interacting with the current user's identity
   */
  services: Array<Service>
}
export type Event = {
  /**
   * - ID of the block that contains the event.
   */
  blockId: string
  /**
   * - Height of the block that contains the event.
   */
  blockHeight: number
  /**
   * - The timestamp of when the block was sealed in a DateString format. eg. '2021-06-25T13:42:04.227Z'
   */
  blockTimestamp: string
  /**
   * - A string containing the event name.
   */
  type: string
  /**
   * - Can be used to query transaction information, eg. via a Flow block explorer.
   */
  transactionId: string
  /**
   * - Used to prevent replay attacks.
   */
  transactionIndex: number
  /**
   * - Used to prevent replay attacks.
   */
  eventIndex: number
  /**
   * - The data emitted from the event.
   */
  data: any
}
export type Key = {
  /**
   * - Sequence number of key used by the proposer of this transaction
   */
  sequenceNumber: number
  /**
   * - The ID of the key in the account used by the proposer of this transaction
   */
  keyId: number
  /**
   * - The address of the proposer of this transaction
   */
  address: string
}
export type Service = {
  /**
   * - A type identifier used internally by FCL
   */
  f_type: string
  /**
   * - FCL protocol version
   */
  f_vsn: string
  /**
   * - Service type
   */
  type: string
  /**
   * - Service method
   */
  method: string
  /**
   * - Service uid
   */
  uid?: string
  /**
   * - Service endpoint
   */
  endpoint: string
  /**
   * - Service provider object
   */
  provider: Provider

  params: Record<string, string>
}
export type Signature = {
  /**
   * - Sequence number of the key used to perform this signature.
   */
  sequenceNumber: string
  /**
   * - ID of the key in the account used to perform this signature.
   */
  keyId: number
  /**
   * - The signature represented as a hex string.
   */
  signature: string
}
export type Transaction = {
  /**
   * - The Cadence code used to execute this transaction.
   */
  script: string
  /**
   * - The JSON-CDC encoded arguments passed in to the transaction.
   */
  args: Array<string>
  /**
   * - The reference block id for this transaction.
   */
  referenceBlockId: string
  /**
   * - The gas limit for the transaction.
   */
  gasLimit: number
  /**
   * - The key used by the proposer of this transaction.
   */
  proposalKey: Key
  /**
   * - Sequence number of the key used by the proposer of this transaction.
   */
  sequenceNumber: string
  /**
   * - The ID of the key in the account used by the proposer of this transaction.
   */
  keyId: number
  /**
   * - The address of the proposer of this transaction.
   */
  address: string
  /**
   * - Address of the payer of the transaction.
   */
  payer: string
  /**
   * - Address of the proposer of this transaction.
   */
  proposer: string
  /**
   * - Array of addresses of authorizers of this transaction.
   */
  authorizers: Array<string>
  /**
   * - The payload signatures for the transaction.
   */
  payloadSignatures: Array<Signature>
  /**
   * - The envelope signatures for the transaction.
   */
  envelopeSignatures: Array<Signature>
}
export type TransactionStatus = {
  /**
   * - The ID of the Block the transaction is included in.
   */
  blockId: string
  /**
   * - The execution status of the transaction
   */
  status: TransactionExecutionStatus
  /**
   * - The status as as descriptive text (e.g. "FINALIZED").
   */
  statusString: string
  /**
   * - The result of the transaction, if executed (i.e. 0 for success, 1 for failure)
   */
  statusCode: 0 | 1
  /**
   * - The error message of the transaction.
   */
  errorMessage: string
  /**
   * - The events for this result.
   */
  events: Array<Event>
}
/**
 * The execution status of the transaction.
 */
export enum TransactionExecutionStatus {
  UNKNOWN = 0,
  PENDING = 1,
  FINALIZED = 2,
  EXECUTED = 3,
  SEALED = 4,
  EXPIRED = 5,
}
/*
 * The Provider type describes a Wallet Provider associated with a specific Service.
 */
export type Provider = {
  /**
   * The blockchain address of the Wallet provider.
   */
  address?: string
  /**
   * The name of the Wallet provider.
   */
  name?: string
  /**
   * The icon of the Wallet provider (may be a URL or a data URI).
   */
  icon?: string
  /**
   * A brief description of the Wallet provider.
   */
  description?: string
  /**
   * The preferred color to represent the Wallet provider (e.g., for UI styling).
   */
  color?: string
  /**
   * The support email address of the Wallet provider.
   */
  supportEmail?: string
  /**
   * The website URL of the Wallet provider.
   */
  website?: string
  /**
   * Indicates whether the Wallet provider is installed (if applicable).
   */
  is_installed?: boolean
}
export type NodeVersionInfo = {
  /**
   * - The semver version of the node.
   */
  semver: string
  /**
   * - The commit hash of the node.
   */
  commit: string
  /**
   * - The spork id of the node.
   */
  sporkId: string
  /**
   * - The protocol version of the node.
   */
  protocolVersion: number
  /**
   * - The spork root block height of the node.
   */
  sporkRootBlockHeight: number
  /**
   * - The node root block height of the node.
   */
  nodeRootBlockHeight: number
}
export interface StreamConnection<ChannelMap extends {[name: string]: any}> {
  on<C extends keyof ChannelMap>(
    channel: C,
    listener: (data: ChannelMap[C]) => void
  ): this
  on(event: "close", listener: () => void): this
  on(event: "error", listener: (err: any) => void): this
  off<C extends keyof ChannelMap>(
    event: C,
    listener: (data: ChannelMap[C]) => void
  ): this
  off(event: "close", listener: () => void): this
  off(event: "error", listener: (err: any) => void): this
  close(): void
}

export interface EventFilter {
  eventTypes?: string[]
  addresses?: string[]
  contracts?: string[]
}

export interface BlockHeartbeat {
  blockId: string
  blockHeight: number
  timestamp: string
}

export type EventStream = StreamConnection<{
  events: Event[]
  heartbeat: BlockHeartbeat
}>

export * from "./interaction"
export * from "./fvm-errors"
export * as SdkTransport from "./sdk-transport"
