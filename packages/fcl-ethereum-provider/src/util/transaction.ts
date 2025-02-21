import * as fcl from "@onflow/fcl"
import * as rlp from "@onflow/rlp"
import {bytesToHex, hexToBytes} from "@noble/hashes/utils"
import {keccak_256} from "@noble/hashes/sha3"

// Helper function to convert a number or bigint to a Uint8Array (minimal byte representation)
function numberToUint8Array(value: number | bigint): Uint8Array {
  const big = typeof value === "bigint" ? value : BigInt(value)
  if (big === BigInt(0)) return new Uint8Array([])
  let hex = big.toString(16)
  if (hex.length % 2 !== 0) {
    hex = "0" + hex
  }
  return hexToBytes(hex)
}

/**
 * Pre-calculates the transaction hash by building the transaction array,
 * encoding it with RLP, and hashing it with keccak_256.
 */
export function precalculateTxHash(
  nonce: number,
  gas: string,
  value: string,
  to: string,
  data: string,
  evmAddress: string
): string {
  const gasLimit = BigInt(gas)
  const valueHex = fcl.sansPrefix(value)
  const txValue = BigInt("0x" + valueHex)
  const dataHex = fcl.sansPrefix(data)

  const gasPrice = BigInt(0)
  const directCallTxType = BigInt(255)
  const contractCallSubType = BigInt(5)

  const txArray = [
    numberToUint8Array(nonce),
    numberToUint8Array(gasPrice),
    numberToUint8Array(gasLimit),
    hexToBytes(fcl.sansPrefix(to)),
    numberToUint8Array(txValue),
    hexToBytes(dataHex),
    numberToUint8Array(directCallTxType),
    numberToUint8Array(BigInt(fcl.withPrefix(evmAddress))),
    numberToUint8Array(contractCallSubType),
  ]

  const encodedTx = rlp.encode(txArray)
  const digest = keccak_256(encodedTx)
  return fcl.withPrefix(bytesToHex(digest))
}
