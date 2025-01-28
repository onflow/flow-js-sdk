import { AccountManager } from "./account-manager"
import * as fcl from "@onflow/fcl"
import {CurrentUser} from "@onflow/typedefs"

jest.mock("@onflow/fcl", () => ({
  currentUser: {
    subscribe: jest.fn(),
    snapshot: jest.fn(),
  },
  query: jest.fn(),
  arg: jest.fn(),
  t: {
    Address: "Address",
  },
}))

export function mockUser(): jest.Mocked<typeof fcl.currentUser> {
  const currentUser = {
    authenticate: jest.fn(),
    unauthenticate: jest.fn(),
    authorization: jest.fn(),
    signUserMessage: jest.fn(),
    subscribe: jest.fn(),
    snapshot: jest.fn(),
    resolveArgument: jest.fn(),
  };

  return Object.assign(
    jest.fn(() => currentUser),
    currentUser
  );
}

describe("AccountManager", () => {
  let accountManager: AccountManager
  let mockQuery: jest.Mock
  let user: jest.Mocked<typeof fcl.currentUser>

  beforeEach(() => {
    mockQuery = jest.fn()

    user = mockUser()

    jest.spyOn(fcl, "query").mockImplementation(mockQuery)

    accountManager = new AccountManager(user)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should initialize with null COA address", () => {
    expect(accountManager.getCOAAddress()).toBeNull()
    expect(accountManager.getAccounts()).toEqual([])
  })

  it("should reset state when the user is not logged in", async () => {
    user.snapshot.mockResolvedValueOnce({ addr: undefined } as CurrentUser)

    await accountManager.updateCOAAddress()

    expect(accountManager.getCOAAddress()).toBeNull()
    expect(accountManager.getAccounts()).toEqual([])
  })

  it("should fetch and update COA address when user logs in", async () => {
    user.snapshot.mockResolvedValue({ addr: "0x1" } as CurrentUser)
    mockQuery.mockResolvedValue("0x123")

    await accountManager.updateCOAAddress()

    expect(accountManager.getCOAAddress()).toBe("0x123")
    expect(accountManager.getAccounts()).toEqual(["0x123"])
    expect(fcl.query).toHaveBeenCalledWith({
      cadence: expect.any(String),
      args: expect.any(Function),
    })
  })

  it("should not update COA address if user has not changed and force is false", async () => {
    user.snapshot.mockResolvedValue({ addr: "0x1" } as CurrentUser)
    mockQuery.mockResolvedValue("0x123")
    user.subscribe.mockImplementation(fn => {
      fn({ addr: "0x1"})
    })

    await accountManager.updateCOAAddress()
    expect(accountManager.getCOAAddress()).toBe("0x123")
    expect(fcl.query).toHaveBeenCalledTimes(1)

    // Re-run without changing the address
    await accountManager.updateCOAAddress()
    expect(accountManager.getCOAAddress()).toBe("0x123")
    expect(fcl.query).toHaveBeenCalledTimes(1) // Should not have fetched again
  })

  it("should force update COA address even if user has not changed", async () => {
    user.snapshot.mockResolvedValue({ addr: "0x1" } as CurrentUser)
    mockQuery.mockResolvedValue("0x123")
    user.subscribe.mockImplementation(fn => {
      fn({ addr: "0x1"})
    })

    await accountManager.updateCOAAddress()
    expect(fcl.query).toHaveBeenCalledTimes(1)

    // Force update
    await accountManager.updateCOAAddress(true)
    expect(fcl.query).toHaveBeenCalledTimes(2)
  })

  it("should not update COA address if fetch is outdated when user changes", async () => {
    // Simulates the user address changing from 0x1 to 0x2
    user.snapshot
      .mockResolvedValueOnce({ addr: "0x1" } as CurrentUser) // for 1st call
      .mockResolvedValueOnce({ addr: "0x2" } as CurrentUser) // for 2nd call

    mockQuery
      // 1st fetch: delayed
      .mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve("0x123"), 500))
      )
      // 2nd fetch: immediate
      .mockResolvedValueOnce("0x456")

    const updatePromise1 = accountManager.updateCOAAddress()
    const updatePromise2 = accountManager.updateCOAAddress()
    await Promise.all([updatePromise1, updatePromise2])

    // The second fetch (for address 0x2) is the latest, so "0x456"
    expect(accountManager.getCOAAddress()).toBe("0x456")
  })
})
