import {ethAccounts, ethRequestAccounts} from "./eth-accounts"
import {AccountManager} from "../../accounts/account-manager"

describe("ethAccounts handler", () => {
  let accountManagerMock: jest.Mocked<AccountManager>

  beforeEach(() => {
    accountManagerMock = {
      getAccounts: jest.fn(),
      subscribe: jest.fn(),
      updateCOAAddress: jest.fn(),
    } as unknown as jest.Mocked<AccountManager>
  })

  it("should return accounts from the AccountManager", async () => {
    accountManagerMock.getAccounts.mockResolvedValue(["0x1234...", "0x5678..."])

    const accounts = await ethAccounts(accountManagerMock)

    expect(accounts).toEqual(["0x1234...", "0x5678..."])
    expect(accountManagerMock.getAccounts).toHaveBeenCalled()
  })

  it("should return an empty array if no accounts are available", async () => {
    accountManagerMock.getAccounts.mockResolvedValue([])

    const accounts = await ethAccounts(accountManagerMock)

    expect(accounts).toEqual([])
    expect(accountManagerMock.getAccounts).toHaveBeenCalled()
  })
})

describe("ethRequestAccounts handler", () => {
  let accountManagerMock: jest.Mocked<AccountManager>

  beforeEach(() => {
    accountManagerMock = {
      authenticate: jest.fn(),
      getAccounts: jest.fn(),
      getAndCreateAccounts: jest.fn(),
      updateCOAAddress: jest.fn(),
      subscribe: jest.fn(),
    } as unknown as jest.Mocked<AccountManager>
  })

  it("should call authenticate, updateCOAAddress, and return the manager's accounts", async () => {
    accountManagerMock.getAndCreateAccounts.mockResolvedValue(["0x1234..."])

    const accounts = await ethRequestAccounts(accountManagerMock, 747)

    expect(accounts).toEqual(["0x1234..."])

    expect(accountManagerMock.authenticate).toHaveBeenCalled()
    expect(accountManagerMock.getAndCreateAccounts).toHaveBeenCalledWith(747)
  })

  it("should handle empty accounts scenario", async () => {
    accountManagerMock.getAndCreateAccounts.mockResolvedValue([])

    const accounts = await ethRequestAccounts(accountManagerMock, 747)

    expect(accountManagerMock.authenticate).toHaveBeenCalled()
    expect(accountManagerMock.getAndCreateAccounts).toHaveBeenCalledWith(747)
    expect(accounts).toEqual([])
  })
})
