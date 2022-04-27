import {config} from "@onflow/config"
import {invariant} from "@onflow/util-invariant"
import {query} from "../exec/query"
import {encodeAccountProof} from "../wallet-utils"

const ACCOUNT_PROOF = "ACCOUNT_PROOF"
const USER_SIGNATURE = "USER_SIGNATURE"

export const validateArgs = args => {
  if (args.appIdentifier) {
    const {appIdentifier, address, nonce, signatures} = args
    invariant(
      typeof appIdentifier === "string",
      "appIdentifier must be a string"
    )
    invariant(/^[0-9a-f]+$/i.test(nonce), "Nonce must be a hex string")
    invariant(
      Array.isArray(signatures) &&
        signatures.every((sig, i, arr) => sig.f_type === "CompositeSignature"),
      "Must include an Array of CompositeSignatures to verify"
    )
    invariant(
      signatures.map(cs => cs.addr).every((addr, i, arr) => addr === arr[0]),
      "User signatures to be verified must be from a single account address"
    )
    return true
  } else {
    const {message, compSigs} = args
    invariant(
      /^[0-9a-f]+$/i.test(message),
      "Signed message must be a hex string"
    )
    invariant(
      Array.isArray(compSigs) &&
        compSigs.every((sig, i, arr) => sig.f_type === "CompositeSignature"),
      "Must include an Array of CompositeSignatures to verify"
    )
    invariant(
      compSigs.map(cs => cs.addr).every((addr, i, arr) => addr === arr[0]),
      "User signatures to be verified must be from a single account address"
    )
    return true
  }
}

const getVerifySignaturesScript = async (sig, opts) => {
  let contractAddress
  const verifyFunction =
    sig === "ACCOUNT_PROOF"
      ? "verifyAccountProofSignatures"
      : "verifyUserSignatures"
  const network = await config.first(["env", "network"])
  invariant(
    network,
    "Network (local, testnet, mainnet) must be provided via fcl.config.env or fcl.config.network"
  )

  switch (network) {
    case "local":
      invariant(
        opts.contractAddress,
        `In ${verifyFunction}: opts.contractAddress required for FCLCrypto contract on ${network} env`
      )
      contractAddress = opts.contractAddress
      break
    case "testnet":
      contractAddress = "0x74daa6f9c7ef24b1"
      break
    case "mainnet":
      contractAddress = "0xb4b82a1c9d21d284"
      break
    default:
      contractAddress = "0xb4b82a1c9d21d284"
  }

  return `
      import FCLCrypto from ${contractAddress}

      pub fun main(
          address: Address, 
          message: String, 
          keyIndices: [Int], 
          signatures: [String]
      ): Bool {
        return FCLCrypto.${verifyFunction}(address: address, message: message, keyIndices: keyIndices, signatures: signatures)
      }
    `
}

/**
 * Verify a valid account proof signature or signatures for an account on Flow.
 *
 * @param {string} appIdentifier - A message string in hexadecimal format
 * @param {Object} accountProofData - An object consisting of address, nonce, and signatures
 * @param {string} accountProofData.address - A Flow account address
 * @param {string} accountProofData.nonce - A random string in hexadecimal format (minimum 32 bytes in total, i.e 64 hex characters)
 * @param {Object[]} accountProofData.signatures - An array of composite signatures to verify
 * @param {Object} [opts={}] - Options object
 * @param {string} opts.contractAddress - An optional Flow account address where the FCLCrypto contract is deployed
 * @return {bool}
 *
 * @example
 *
 *  const accountProofData = {
 *   address: "0x123",
 *   nonce: "F0123"
 *   signatures: [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *  }
 *
 *  const isValid = await fcl.AppUtils.verifyAccountProof(
 *    "AwesomeAppId",
 *    accountProofData,
 *    {contractAddress}
 *  )
 */

export async function verifyAccountProof(
  appIdentifier,
  {address, nonce, signatures},
  opts = {}
) {
  validateArgs({appIdentifier, address, nonce, signatures})

  const message = encodeAccountProof({address, nonce, appIdentifier}, false)

  let signaturesArr = []
  let keyIndices = []

  for (const el of signatures) {
    signaturesArr.push(el.signature)
    keyIndices.push(el.keyId)
  }

  return query({
    cadence: await getVerifySignaturesScript(ACCOUNT_PROOF, opts),
    args: (arg, t) => [
      arg(address, t.Address),
      arg(message, t.String),
      arg(keyIndices, t.Array([t.Int])),
      arg(signaturesArr, t.Array([t.String])),
    ],
  })
}

/**
 * Verify a valid signature/s for an account on Flow.
 *
 * @param {string} msg - A message string in hexadecimal format
 * @param {Array} compSigs - An array of Composite Signatures
 * @param {string} compSigs[].addr - The account address
 * @param {number} compSigs[].keyId - The account keyId
 * @param {string} compSigs[].signature - The signature to verify
 * @param {Object} [opts={}] - Options object
 * @param {string} opts.contractAddress - An optional Flow account address where the FCLCrypto contract is deployed
 * @return {bool}
 *
 * @example
 *
 *  const isValid = await fcl.AppUtils.verifyUserSignatures(
 *    Buffer.from('FOO').toString("hex"),
 *    [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *    {contractAddress}
 *  )
 */
export async function verifyUserSignatures(message, compSigs, opts = {}) {
  validateArgs({message, compSigs})

  const address = compSigs[0].addr
  let signaturesArr = []
  let keyIndices = []

  for (const el of compSigs) {
    signaturesArr.push(el.signature)
    keyIndices.push(el.keyId)
  }

  return query({
    cadence: await getVerifySignaturesScript(USER_SIGNATURE, opts),
    args: (arg, t) => [
      arg(address, t.Address),
      arg(message, t.String),
      arg(keyIndices, t.Array([t.Int])),
      arg(signaturesArr, t.Array([t.String])),
    ],
  })
}
