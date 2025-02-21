import {AccountManager} from "./account-manager"
import {mockUser} from "../__mocks__/fcl"
import * as fcl from "@onflow/fcl"
import {CurrentUser, FvmErrorCode} from "@onflow/typedefs"
import {NetworkManager} from "../network/network-manager"
import {BehaviorSubject} from "../util/observable"
import {TransactionError} from "@onflow/fcl"
import * as notifications from "../notifications"

jest.mock("@onflow/fcl", () => {
  const fcl = jest.requireActual("@onflow/fcl")
  return {
    withPrefix: fcl.withPrefix,
    sansPrefix: fcl.sansPrefix,
    tx: jest.fn(),
    mutate: jest.fn(),
    query: jest.fn(),
    TransactionError: {
      fromErrorMessage: jest.fn(),
    },
  }
})

jest.mock("../notifications", () => ({
  displayErrorNotification: jest.fn(),
}))

const mockFcl = jest.mocked(fcl)
const mockQuery = jest.mocked(fcl.query)

describe("AccountManager", () => {
  let networkManager: jest.Mocked<NetworkManager>
  let userMock: ReturnType<typeof mockUser>

  beforeEach(() => {
    jest.resetAllMocks()

    const chainId$ = new BehaviorSubject<number | null>(747)
    networkManager = {
      $chainId: chainId$,
      getChainId: () => chainId$.getValue(),
    } as any as jest.Mocked<NetworkManager>
    userMock = mockUser()
  })

  it("should initialize with null COA address", async () => {
    const accountManager = new AccountManager(userMock.mock, networkManager)
    expect(await accountManager.getCOAAddress()).toBeNull()
    expect(await accountManager.getAccounts()).toEqual([])
  })

  it("should reset state when the user is not logged in", async () => {
    const accountManager = new AccountManager(userMock.mock, networkManager)

    expect(await accountManager.getCOAAddress()).toBeNull()
    expect(await accountManager.getAccounts()).toEqual([])
  })

  it("should fetch and update COA address when user logs in", async () => {
    mockQuery.mockResolvedValue("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    expect(await accountManager.getCOAAddress()).toBe(null)

    userMock.set!({addr: "0x1"} as CurrentUser)

    expect(await accountManager.getCOAAddress()).toBe("0x123")
    expect(await accountManager.getAccounts()).toEqual(["0x123"])
    expect(fcl.query).toHaveBeenCalledWith({
      cadence: expect.any(String),
      args: expect.any(Function),
    })
  })

  it("should not update COA address if user has not changed", async () => {
    mockQuery.mockResolvedValue("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    userMock.set!({addr: "0x1"} as CurrentUser)

    await new Promise(setImmediate)

    expect(await accountManager.getCOAAddress()).toBe("0x123")
    expect(fcl.query).toHaveBeenCalledTimes(1)

    userMock.set!({addr: "0x1"} as CurrentUser)

    expect(await accountManager.getCOAAddress()).toBe("0x123")
    expect(fcl.query).toHaveBeenCalledTimes(1) // Should not have fetched again
  })

  it("should not update COA address if fetch is outdated when user changes", async () => {
    mockQuery.mockResolvedValue("0x123")

    mockQuery
      // 1st fetch: delayed
      .mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve("0x123"), 500))
      )
      // 2nd fetch: immediate
      .mockResolvedValueOnce("0x456")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    await userMock.set!({addr: "0x1"} as CurrentUser)
    await userMock.set!({addr: "0x2"} as CurrentUser)

    // The second fetch (for address 0x2) is the latest, so "0x456"
    expect(await accountManager.getCOAAddress()).toBe("0x456")
  })

  it("should throw if COA address fetch fails", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Fetch failed"))

    const accountManager = new AccountManager(userMock.mock, networkManager)

    await userMock.set!({addr: "0x1"} as CurrentUser)

    await expect(accountManager.getCOAAddress()).rejects.toThrow("Fetch failed")
  })

  it("getAndCreateAccounts should get a COA address if it already exists", async () => {
    mockQuery.mockResolvedValue("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    // Trigger the state update
    await userMock.set!({addr: "0x1"} as CurrentUser)

    // Call getAndCreateAccounts. Since the COA already exists, it should just return it.
    const accounts = await accountManager.getAndCreateAccounts(545)

    expect(accounts).toEqual(["0x123"])
    // Should not have created a new COA
    expect(fcl.mutate).not.toHaveBeenCalled()
  })

  it("getAndCreateAccounts should create a COA if it does not exist", async () => {
    const mockTxResult = {
      onceExecuted: jest.fn().mockResolvedValue({
        events: [
          {
            type: "A.e467b9dd11fa00df.EVM.CadenceOwnedAccountCreated",
            data: {
              address: "0x123",
            },
          },
        ],
      }),
    } as any as jest.Mocked<ReturnType<typeof fcl.tx>>

    jest.mocked(fcl.tx).mockReturnValue(mockTxResult)
    jest.mocked(fcl.mutate).mockResolvedValue("1111")

    // For the subscription, simulate that initially no COA is found, then after creation the query returns "0x123"
    mockQuery.mockResolvedValueOnce(null).mockResolvedValueOnce("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    await userMock.set!({addr: "0x1"} as CurrentUser)

    const accounts = await accountManager.getAndCreateAccounts(747)
    expect(accounts).toEqual(["0x123"])
    expect(fcl.mutate).toHaveBeenCalled()
  })

  it("should display error notification and throw if STORAGE_CAPACITY_EXCEEDED error occurs", async () => {
    const txResultError = {
      onceExecuted: jest.fn().mockResolvedValue({
        statusCode: 0,
        errorMessage: "Simulated error",
        events: [],
      }),
    } as any as jest.Mocked<ReturnType<typeof fcl.tx>>

    jest.mocked(fcl.tx).mockReturnValue(txResultError)
    jest.mocked(fcl.mutate).mockResolvedValue("1111")

    const storageError = {
      code: FvmErrorCode.STORAGE_CAPACITY_EXCEEDED,
      message: "Simulated storage capacity exceeded",
      type: "TRANSACTION_ERROR",
      name: "TransactionError",
    } as TransactionError

    jest.mocked(TransactionError.fromErrorMessage).mockReturnValue(storageError)

    const accountManager = new AccountManager(userMock.mock, networkManager)

    await userMock.set!({addr: "0x1"} as CurrentUser)

    await expect(accountManager.createCOA(747)).rejects.toThrow(
      "Insufficient funds to cover storage costs."
    )
    expect(notifications.displayErrorNotification).toHaveBeenCalledWith(
      "Storage Error",
      "Your wallet does not have enough funds to cover storage costs. Please add more funds."
    )
  })

  it("should handle user changes correctly", async () => {
    mockQuery
      .mockResolvedValueOnce("0x123") // for user 0x1
      .mockResolvedValueOnce("0x456") // for user 0x2

    const accountManager = new AccountManager(userMock.mock, networkManager)

    await userMock.set({addr: "0x1"} as CurrentUser)
    expect(await accountManager.getCOAAddress()).toBe("0x123")

    await userMock.set({addr: "0x2"} as CurrentUser)

    expect(await accountManager.getCOAAddress()).toBe("0x456")
  })

  it("should call the callback with updated accounts in subscribe", async () => {
    mockQuery.mockResolvedValue("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    const callback = jest.fn()
    accountManager.subscribe(callback)

    await userMock.set({addr: "0x1"} as CurrentUser)

    expect(callback).toHaveBeenCalledWith(["0x123"])
  })

  it("should reset accounts in subscribe if user is not authenticated", async () => {
    mockQuery.mockResolvedValue("0x123")

    const callback = jest.fn()

    const accountManager = new AccountManager(userMock.mock, networkManager)

    accountManager.subscribe(callback)

    await new Promise(setImmediate)

    expect(callback).toHaveBeenCalledWith([])
  })

  it("should call the callback when COA address is updated", async () => {
    const callback = jest.fn()

    mockQuery.mockResolvedValueOnce("0x123")

    const accountManager = new AccountManager(userMock.mock, networkManager)

    userMock.set({addr: "0x1"} as CurrentUser)

    accountManager.subscribe(callback)

    await new Promise(setImmediate)

    expect(callback).toHaveBeenCalledWith(["0x123"])
  })

  it("should return an empty array when COA address is null", async () => {
    const accountManager = new AccountManager(userMock.mock, networkManager)
    expect(await accountManager.getAccounts()).toEqual([])
  })

  it("should return COA address array when available", async () => {
    mockQuery.mockResolvedValueOnce("0x123")
    userMock.set({addr: "0x1"} as CurrentUser)

    const accountManager = new AccountManager(userMock.mock, networkManager)

    expect(await accountManager.getAccounts()).toEqual(["0x123"])
  })

  test("should update accounts if user is connected to the same authz service", async () => {
    userMock.set({
      addr: "0x1",
      services: [
        {
          f_type: "Service",
          f_vsn: "1.0.0",
          endpoint: "flow_authn",
          method: "EXT/RPC",
          type: "authz",
          uid: "123",
        },
      ],
    } as CurrentUser)

    const accountManager = new AccountManager(userMock.mock, networkManager, {
      uid: "123",
    } as any)

    const callback = jest.fn()
    accountManager.subscribe(callback)

    await new Promise(setImmediate)

    expect(callback).toHaveBeenCalledWith([])
  })

  it("should not update accounts if user is connected to different authz service", async () => {
    userMock.set({
      addr: "0x1",
      services: [
        {
          f_type: "Service",
          f_vsn: "1.0.0",
          endpoint: "flow_authn",
          method: "EXT/RPC",
          type: "authz",
          uid: "123",
        },
      ],
    } as CurrentUser)

    const accountManager = new AccountManager(userMock.mock, networkManager, {
      uid: "abc",
    } as any)

    const callback = jest.fn()
    accountManager.subscribe(callback)

    await new Promise(setImmediate)

    expect(callback).toHaveBeenCalledWith([])
  })
})

describe("sendTransaction", () => {
  let networkManager: jest.Mocked<NetworkManager>
  let $mockChainId: BehaviorSubject<number | null>

  beforeEach(() => {
    $mockChainId = new BehaviorSubject<number | null>(747)
    networkManager = {
      $chainId: $mockChainId,
      getChainId: () => $mockChainId.getValue(),
    } as any as jest.Mocked<NetworkManager>

    jest.resetAllMocks()
  })

  test("sendTransaction returns a pre-calculated hash (mainnet)", async () => {
    const mockTxResult = {
      onceExecuted: jest.fn().mockResolvedValue({
        events: [
          {
            type: "A.e467b9dd11fa00df.EVM.TransactionExecuted",
            data: {hash: ["12", "34"]},
          },
        ],
      }),
    } as any as jest.Mocked<ReturnType<typeof fcl.tx>>

    jest.mocked(fcl.tx).mockReturnValue(mockTxResult)
    jest.mocked(fcl.mutate).mockResolvedValue("1111")
    jest
      .mocked(fcl.query)
      .mockResolvedValueOnce("0x1234")
      .mockResolvedValueOnce("0x0")

    const user = mockUser({addr: "0x1234"} as CurrentUser).mock
    const accountManager = new AccountManager(user, networkManager)

    // Numbers maxed out to test edge cases
    const txInput = {
      to: "0xffffffffffffffffffffffffffffffffffffffff",
      from: "0x1234",
      value:
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      data: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      gas: "0xffffffffffffffff",
      chainId: "747",
    }

    const result = await accountManager.sendTransaction(txInput)

    expect(result).toEqual(
      "0xc4a532f9ed47b2092206a768b3ad3d32dfd80ed1f3b10690b81fdedc24685de7"
    )
    expect(fcl.mutate).toHaveBeenCalled()
  })

  test("send transaction mainnet", async () => {
    const mockTxResult = {
      onceExecuted: jest.fn().mockResolvedValue({
        events: [
          {
            type: "A.e467b9dd11fa00df.EVM.TransactionExecuted",
            data: {
              hash: ["12", "34"],
            },
          },
        ],
      }),
    } as any as jest.Mocked<ReturnType<typeof fcl.tx>>

    jest.mocked(fcl.tx).mockReturnValue(mockTxResult)
    jest.mocked(fcl.query).mockResolvedValue("0x1234")

    const user = mockUser({addr: "0x4444"} as CurrentUser).mock
    const accountManager = new AccountManager(user, networkManager)

    const tx = {
      to: "0x1234",
      from: "0x1234",
      value: "0",
      data: "0x1234",
      nonce: "0",
      gas: "0",
      chainId: "747",
    }

    const result = await accountManager.sendTransaction(tx)

    expect(result).toEqual(
      "0xb7f94fa964193ab940ed6e24bdc72b4a59eb4e69546d8f423b8e52835dbf1d18"
    )
    expect(fcl.mutate).toHaveBeenCalled()
    expect(mockFcl.mutate.mock.calls[0][0]).toMatchObject({
      cadence: expect.any(String),
      args: expect.any(Function),
      authz: user,
      limit: 9999,
    })
  })

  test("send transaction testnet", async () => {
    // Set chainId to testnet
    $mockChainId.next(545)

    const mockTxResult = {
      onceExecuted: jest.fn().mockResolvedValue({
        events: [
          {
            type: "A.8c5303eaa26202d6.EVM.TransactionExecuted",
            data: {
              hash: ["12", "34"],
            },
          },
        ],
      }),
    } as any as jest.Mocked<ReturnType<typeof fcl.tx>>

    jest.mocked(fcl.tx).mockReturnValue(mockTxResult)
    jest.mocked(fcl.mutate).mockResolvedValue("1111")
    jest.mocked(fcl.query).mockResolvedValue("0x1234")

    const user = mockUser({addr: "0x4444"} as CurrentUser)
    const accountManager = new AccountManager(user.mock, networkManager)

    const tx = {
      to: "0x1234",
      from: "0x1234",
      value: "0",
      data: "0x1234",
      nonce: "0",
      gas: "0",
      chainId: "545",
    }

    const result = await accountManager.sendTransaction(tx)

    expect(result).not.toBeNull()
    expect(fcl.mutate).toHaveBeenCalled()
    expect(mockFcl.mutate.mock.calls[0][0]).toMatchObject({
      cadence: expect.any(String),
      args: expect.any(Function),
      authz: user.mock,
      limit: 9999,
    })
  })

  test("throws error if from address does not match user address", async () => {
    jest.mocked(fcl.query).mockResolvedValue("0x1234")
    const user = mockUser({addr: "0x4444"} as CurrentUser)
    const accountManager = new AccountManager(user.mock, networkManager)

    const tx = {
      to: "0x1234",
      from: "0x4567",
      value: "0",
      data: "0x1234",
      nonce: "0",
      gas: "0",
      chainId: "545",
    }

    await expect(accountManager.sendTransaction(tx)).rejects.toThrow(
      `Chain ID does not match the current network. Expected: 747, Received: 545`
    )

    expect(fcl.mutate).not.toHaveBeenCalled()
  })
})
