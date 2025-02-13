import {sha3_256} from "@noble/hashes/sha3"
import {bytesToHex} from "@noble/hashes/utils"
import {Buffer} from "@onflow/rlp"

export function genHash(utf8String) {
  return bytesToHex(sha3_256(Buffer.from(utf8String, "utf8")))
}
