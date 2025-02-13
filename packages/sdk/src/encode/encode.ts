import {sha3_256} from "@noble/hashes/sha3"
import {bytesToHex} from "@noble/hashes/utils"
import {encode, Buffer, EncodeInput} from "@onflow/rlp"
import {sansPrefix} from "@onflow/util-address"

export const encodeTransactionPayload = (tx: Transaction) =>
  prependTransactionDomainTag(rlpEncode(preparePayload(tx)))
export const encodeTransactionEnvelope = (tx: Transaction) =>
  prependTransactionDomainTag(rlpEncode(prepareEnvelope(tx)))
export const encodeTxIdFromVoucher = (voucher: Voucher) =>
  sha3_256_hash(rlpEncode(prepareVoucher(voucher)))

const rightPaddedHexBuffer = (value: string, pad: number) =>
  Buffer.from(value.padEnd(pad * 2, "0"), "hex")

const leftPaddedHexBuffer = (value: string, pad: number) =>
  Buffer.from(value.padStart(pad * 2, "0"), "hex")

const TRANSACTION_DOMAIN_TAG = rightPaddedHexBuffer(
  Buffer.from("FLOW-V0.0-transaction").toString("hex"),
  32
).toString("hex")
const prependTransactionDomainTag = (tx: string) => TRANSACTION_DOMAIN_TAG + tx

const addressBuffer = (addr: string) => leftPaddedHexBuffer(addr, 8)

const blockBuffer = (block: string) => leftPaddedHexBuffer(block, 32)

const argumentToString = (arg: Record<string, any>) =>
  Buffer.from(JSON.stringify(arg), "utf8")

const scriptBuffer = (script: string) => Buffer.from(script, "utf8")
const signatureBuffer = (signature: string) => Buffer.from(signature, "hex")

const rlpEncode = (v: EncodeInput) => {
  return encode(v).toString("hex")
}

const sha3_256_hash = (msg: string) => {
  return bytesToHex(sha3_256(Buffer.from(msg, "utf8")))
}

const preparePayload = (tx: Transaction) => {
  validatePayload(tx)

  return [
    scriptBuffer(tx.cadence || ""),
    tx.arguments.map(argumentToString),
    blockBuffer(tx.refBlock || ""),
    tx.computeLimit,
    addressBuffer(sansPrefix(tx.proposalKey.address || "")),
    tx.proposalKey.keyId,
    tx.proposalKey.sequenceNum,
    addressBuffer(sansPrefix(tx.payer)),
    tx.authorizers.map(authorizer => addressBuffer(sansPrefix(authorizer))),
  ]
}

const prepareEnvelope = (tx: Transaction) => {
  validateEnvelope(tx)

  return [preparePayload(tx), preparePayloadSignatures(tx)]
}

const preparePayloadSignatures = (tx: Transaction) => {
  const signers = collectSigners(tx)

  return tx.payloadSigs
    ?.map((sig: Sig) => {
      return {
        signerIndex: signers.get(sansPrefix(sig.address)) || "",
        keyId: sig.keyId,
        sig: sig.sig,
      }
    })
    .sort((a, b) => {
      if (a.signerIndex > b.signerIndex) return 1
      if (a.signerIndex < b.signerIndex) return -1

      if (a.keyId > b.keyId) return 1
      if (a.keyId < b.keyId) return -1

      return 0
    })
    .map(sig => {
      return [sig.signerIndex, sig.keyId, signatureBuffer(sig.sig)]
    })
}

const collectSigners = (tx: Voucher | Transaction) => {
  const signers = new Map<string, number>()
  let i = 0

  const addSigner = (addr: string) => {
    if (!signers.has(addr)) {
      signers.set(addr, i)
      i++
    }
  }

  if (tx.proposalKey.address) {
    addSigner(tx.proposalKey.address)
  }
  addSigner(tx.payer)
  tx.authorizers.forEach(addSigner)

  return signers
}

const prepareVoucher = (voucher: Voucher) => {
  validateVoucher(voucher)

  const signers = collectSigners(voucher)

  const prepareSigs = (sigs: Sig[]) => {
    return sigs
      .map(({address, keyId, sig}) => {
        return {signerIndex: signers.get(sansPrefix(address)) || "", keyId, sig}
      })
      .sort((a, b) => {
        if (a.signerIndex > b.signerIndex) return 1
        if (a.signerIndex < b.signerIndex) return -1
        if (a.keyId > b.keyId) return 1
        if (a.keyId < b.keyId) return -1

        return 0
      })
      .map(sig => {
        return [sig.signerIndex, sig.keyId, signatureBuffer(sig.sig)]
      })
  }

  return [
    [
      scriptBuffer(voucher.cadence),
      voucher.arguments.map(argumentToString),
      blockBuffer(voucher.refBlock),
      voucher.computeLimit,
      addressBuffer(sansPrefix(voucher.proposalKey.address)),
      voucher.proposalKey.keyId,
      voucher.proposalKey.sequenceNum,
      addressBuffer(sansPrefix(voucher.payer)),
      voucher.authorizers.map(authorizer =>
        addressBuffer(sansPrefix(authorizer))
      ),
    ],
    prepareSigs(voucher.payloadSigs),
    prepareSigs(voucher.envelopeSigs),
  ]
}

const validatePayload = (tx: Transaction) => {
  payloadFields.forEach(field => checkField(tx, field))
  proposalKeyFields.forEach(field =>
    checkField(tx.proposalKey, field, "proposalKey")
  )
}

const validateEnvelope = (tx: Transaction) => {
  payloadSigsFields.forEach(field => checkField(tx, field))
  tx.payloadSigs?.forEach((sig, index) => {
    payloadSigFields.forEach(field =>
      checkField(sig, field, "payloadSigs", index)
    )
  })
}

const validateVoucher = (voucher: Voucher) => {
  payloadFields.forEach(field => checkField(voucher, field))
  proposalKeyFields.forEach(field =>
    checkField(voucher.proposalKey, field, "proposalKey")
  )
  payloadSigsFields.forEach(field => checkField(voucher, field))
  voucher.payloadSigs.forEach((sig, index) => {
    payloadSigFields.forEach(field =>
      checkField(sig, field, "payloadSigs", index)
    )
  })
  envelopeSigsFields.forEach(field => checkField(voucher, field))
  voucher.envelopeSigs.forEach((sig, index) => {
    envelopeSigFields.forEach(field =>
      checkField(sig, field, "envelopeSigs", index)
    )
  })
}

const isNumber = (v: any): v is number => typeof v === "number"
const isString = (v: any): v is string => typeof v === "string"
const isObject = (v: any) => v !== null && typeof v === "object"
const isArray = (v: any) => isObject(v) && v instanceof Array

interface VoucherArgument {
  type: string
  value: string
}

interface VoucherProposalKey {
  address: string
  keyId: number | null
  sequenceNum: number | null
}

interface Sig {
  address: string
  keyId: number | string
  sig: string
}

export interface TransactionProposalKey {
  address?: string
  keyId?: number | string
  sequenceNum?: number
}
export interface Transaction {
  cadence: string
  refBlock: string
  computeLimit: number
  arguments: VoucherArgument[]
  proposalKey: TransactionProposalKey
  payer: string
  authorizers: string[]
  payloadSigs?: Sig[]
  envelopeSigs?: TransactionProposalKey[]
}

export interface Voucher {
  cadence: string
  refBlock: string
  computeLimit: number
  arguments: VoucherArgument[]
  proposalKey: VoucherProposalKey
  payer: string
  authorizers: string[]
  payloadSigs: Sig[]
  envelopeSigs: Sig[]
}

interface PayloadField {
  name: string
  check: (v: any) => boolean
  defaultVal?: string
}

const payloadFields: PayloadField[] = [
  {name: "cadence", check: isString},
  {name: "arguments", check: isArray},
  {name: "refBlock", check: isString, defaultVal: "0"},
  {name: "computeLimit", check: isNumber},
  {name: "proposalKey", check: isObject},
  {name: "payer", check: isString},
  {name: "authorizers", check: isArray},
]

const proposalKeyFields: PayloadField[] = [
  {name: "address", check: isString},
  {name: "keyId", check: isNumber},
  {name: "sequenceNum", check: isNumber},
]

const payloadSigsFields: PayloadField[] = [
  {name: "payloadSigs", check: isArray},
]

const payloadSigFields: PayloadField[] = [
  {name: "address", check: isString},
  {name: "keyId", check: isNumber},
  {name: "sig", check: isString},
]

const envelopeSigsFields: PayloadField[] = [
  {name: "envelopeSigs", check: isArray},
]

const envelopeSigFields: PayloadField[] = [
  {name: "address", check: isString},
  {name: "keyId", check: isNumber},
  {name: "sig", check: isString},
]

const checkField = (
  obj: Record<string, any>,
  field: PayloadField,
  base?: string,
  index?: number
) => {
  const {name, check, defaultVal} = field
  if (obj[name] == null && defaultVal != null) obj[name] = defaultVal
  if (obj[name] == null) throw missingFieldError(name, base, index)
  if (!check(obj[name])) throw invalidFieldError(name, base, index)
}

const printFieldName = (field: string, base?: string, index?: number) => {
  if (!!base)
    return index == null ? `${base}.${field}` : `${base}.${index}.${field}`
  return field
}

const missingFieldError = (field: string, base?: string, index?: number) =>
  new Error(`Missing field ${printFieldName(field, base, index)}`)
const invalidFieldError = (field: string, base?: string, index?: number) =>
  new Error(`Invalid field ${printFieldName(field, base, index)}`)
