import {NetworkManager} from "../network/network-manager"
import {AccountManager} from "./account-manager"
import {mockUser} from "../__mocks__/fcl"
import {CurrentUser} from "@onflow/typedefs"
import * as fcl from "@onflow/fcl"
import {BehaviorSubject} from "../util/observable"
import * as rlp from "@onflow/rlp"

jest.mock("@onflow/fcl", () => {
  const fcl = jest.requireActual("@onflow/fcl")
  return {
    withPrefix: fcl.withPrefix,
    sansPrefix: fcl.sansPrefix,
    mutate: jest.fn(),
    query: jest.fn(),
  }
})

jest.mock("@onflow/rlp", () => ({
  encode: jest.fn(),
  Buffer: jest.requireActual("@onflow/rlp").Buffer,
}))

describe("signMessage", () => {
  let networkManager: jest.Mocked<NetworkManager>
  let accountManager: AccountManager
  let user: ReturnType<typeof mockUser>["mock"]
  let updateUser: ReturnType<typeof mockUser>["set"]

  beforeEach(() => {
    jest.resetAllMocks()
    ;({mock: user, set: updateUser} = mockUser({addr: "0x123"} as CurrentUser))
    jest.mocked(fcl.query).mockResolvedValue("0xCOA1")
    const $mockChainId = new BehaviorSubject<number | null>(747)
    networkManager = {
      $chainId: $mockChainId,
      getChainId: () => $mockChainId.getValue(),
    } as any as jest.Mocked<NetworkManager>
    accountManager = new AccountManager(user, networkManager)
  })

  it("should throw an error if the COA address is not available", async () => {
    await updateUser({addr: undefined} as CurrentUser)

    await expect(
      accountManager.signMessage("Test message", "0x1234")
    ).rejects.toThrow(
      "COA address is not available. User might not be authenticated."
    )
  })

  it("should throw an error if the signer address does not match the COA address", async () => {
    await expect(
      accountManager.signMessage("Test message", "0xDIFFERENT")
    ).rejects.toThrow("Signer address does not match authenticated COA address")
  })

  it("should successfully sign a message and return an RLP-encoded proof", async () => {
    const mockSignature = "0xabcdef1234567890"
    const mockRlpEncoded = "f86a808683abcdef682f73746f726167652f65766d"

    user.signUserMessage.mockResolvedValue([
      {addr: "0xCOA1", keyId: 0, signature: mockSignature} as any,
    ])

    jest.mocked(rlp.encode).mockReturnValue(Buffer.from(mockRlpEncoded, "hex"))

    const proof = await accountManager.signMessage("Test message", "0xCOA1")

    expect(proof).toBe(`0x${mockRlpEncoded}`)

    expect(user.signUserMessage).toHaveBeenCalledWith("Test message")

    expect(rlp.encode).toHaveBeenCalledWith([
      [0],
      expect.any(Buffer),
      "/public/evm",
      [mockSignature],
    ])
  })

  it("should throw an error if signUserMessage returns an empty array", async () => {
    user.signUserMessage.mockResolvedValue([])
    await expect(
      accountManager.signMessage("Test message", "0xCOA1")
    ).rejects.toThrow("Failed to sign message")
  })

  it("should throw an error if signUserMessage fails", async () => {
    user.signUserMessage = jest
      .fn()
      .mockRejectedValue(new Error("Signing failed"))

    await expect(
      accountManager.signMessage("Test message", "0xCOA1")
    ).rejects.toThrow("Signing failed")
  })
})
