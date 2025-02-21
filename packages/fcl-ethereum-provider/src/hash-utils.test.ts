import {keccak_256} from "@noble/hashes/sha3"
import {bytesToHex} from "@noble/hashes/utils"
import {concat, arrayify} from "@ethersproject/bytes"
import {_TypedDataEncoder as TypedDataEncoder} from "@ethersproject/hash"
import {TypedData} from "./types/eth"
import {
  hashTypedDataLegacy,
  hashTypedDataV3,
  hashTypedDataV4,
} from "./hash-utils"

jest.mock("@noble/hashes/sha3", () => ({
  keccak_256: jest.fn(() =>
    Uint8Array.from([0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x90])
  ),
}))

jest.mock("@ethersproject/hash", () => {
  const original = jest.requireActual("@ethersproject/hash")
  return {
    ...original,
    _TypedDataEncoder: {
      hashDomain: jest.fn(
        domain =>
          // Return a valid 32-byte hex string (64 hex characters after "0x")
          "0x1111111111111111111111111111111111111111111111111111111111111111"
      ),
      hash: jest.fn(
        (domain, types, message) =>
          "0x2222222222222222222222222222222222222222222222222222222222222222"
      ),
    },
  }
})

describe("Hash Utils", () => {
  const mockTypedData: TypedData = {
    domain: {name: "Ether Mail", chainId: 1},
    message: {from: "Alice", to: "Bob", contents: "Hello"},
    types: {
      EIP712Domain: [
        {name: "name", type: "string"},
        {name: "chainId", type: "uint256"},
      ],
      Mail: [
        {name: "from", type: "string"},
        {name: "to", type: "string"},
        {name: "contents", type: "string"},
      ],
    },
    primaryType: "Mail",
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("hashTypedDataLegacy", () => {
    it("should throw an error for legacy (legacy support is not provided)", () => {
      expect(() => hashTypedDataLegacy(mockTypedData)).toThrowError(
        "Legacy eth_signTypedData is not supported. Please use eth_signTypedData_v3 or eth_signTypedData_v4 instead."
      )
    })
  })

  describe("hashTypedDataV3", () => {
    it("should call the TypedDataEncoder functions and then keccak_256 correctly", () => {
      const result = hashTypedDataV3(mockTypedData)

      expect(TypedDataEncoder.hashDomain).toHaveBeenCalledWith(
        mockTypedData.domain
      )

      expect(TypedDataEncoder.hash).toHaveBeenCalledWith(
        mockTypedData.domain,
        mockTypedData.types,
        mockTypedData.message
      )

      // The implementation concatenates:
      //   prefix (0x1901), domainSeparator, and messageHash.
      const prefix = "0x1901"
      const expectedConcat = concat([
        arrayify(prefix),
        arrayify(
          "0x1111111111111111111111111111111111111111111111111111111111111111"
        ),
        arrayify(
          "0x2222222222222222222222222222222222222222222222222222222222222222"
        ),
      ])

      expect(keccak_256).toHaveBeenCalledWith(expectedConcat)

      // The keccak_256 mock always returns our fixed Uint8Array,
      // so the expected hash is:
      const expectedV3Hash =
        "0x" +
        bytesToHex(
          Uint8Array.from([0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x90])
        )
      expect(result).toBe(expectedV3Hash)
    })
  })

  describe("hashTypedDataV4", () => {
    it("should produce the same result as v3 (for non-nested cases)", () => {
      const v3Result = hashTypedDataV3(mockTypedData)
      const v4Result = hashTypedDataV4(mockTypedData)
      expect(v4Result).toBe(v3Result)
    })
  })
})
