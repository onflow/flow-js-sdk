import {AccountManager} from "../accounts/account-manager"
import {ChainIdStore, NetworkManager} from "../network/network-manager"
import {BehaviorSubject, Subject} from "../util/observable"
import {EventDispatcher} from "./event-dispatcher"

jest.mock("../accounts/account-manager")
jest.mock("../network/network-manager")

describe("event dispatcher", () => {
  let networkManager: jest.Mocked<NetworkManager>
  let $mockChainId: Subject<ChainIdStore>
  let accountManager: jest.Mocked<AccountManager>

  beforeEach(() => {
    jest.clearAllMocks()
    $mockChainId = new Subject<ChainIdStore>()
    networkManager = {
      $chainId: $mockChainId,
      getChainId: jest.fn(),
    } as any
    accountManager = new (AccountManager as any)()
  })
  test("unsubscribe should remove listener", () => {
    let subs: ((accounts: string[]) => void)[] = []
    accountManager.subscribe.mockImplementation(cb => {
      subs.push(cb)
      return () => {
        subs = subs.filter(sub => sub !== cb)
      }
    })
    const listener = jest.fn()

    const eventDispatcher = new EventDispatcher(accountManager, networkManager)
    eventDispatcher.on("accountsChanged", listener)

    expect(accountManager.subscribe).toHaveBeenCalled()
    expect(accountManager.subscribe).toHaveBeenCalledTimes(1)
    expect(accountManager.subscribe).toHaveBeenCalledWith(expect.any(Function))

    // Simulate account change from account manager
    subs.forEach(sub => sub(["1234"]))

    expect(listener).toHaveBeenCalled()
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(["0x1234"])

    eventDispatcher.off("accountsChanged", listener)

    // Simulate account change from account manager
    subs.forEach(sub => sub(["5678"]))

    expect(listener).toHaveBeenCalledTimes(1)
  })

  test("should emit accountsChanged", () => {
    let mockMgrSubCb: (accounts: string[]) => void
    accountManager.subscribe.mockImplementation(cb => {
      mockMgrSubCb = cb
      return () => {}
    })
    const listener = jest.fn()

    const eventDispatcher = new EventDispatcher(accountManager, networkManager)
    eventDispatcher.on("accountsChanged", listener)

    expect(accountManager.subscribe).toHaveBeenCalled()
    expect(accountManager.subscribe).toHaveBeenCalledTimes(1)
    expect(accountManager.subscribe).toHaveBeenCalledWith(expect.any(Function))

    // Simulate account change from account manager
    mockMgrSubCb!(["1234"])

    expect(listener).toHaveBeenCalled()
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(["0x1234"])
  })

  test("should emit accountsChanged multiple times", () => {
    let mockMgrSubCb: (accounts: string[]) => void
    accountManager.subscribe.mockImplementation(cb => {
      mockMgrSubCb = cb
      return () => {}
    })
    const listener = jest.fn()

    const eventDispatcher = new EventDispatcher(accountManager, networkManager)
    eventDispatcher.on("accountsChanged", listener)

    expect(accountManager.subscribe).toHaveBeenCalled()
    expect(accountManager.subscribe).toHaveBeenCalledTimes(1)
    expect(accountManager.subscribe).toHaveBeenCalledWith(expect.any(Function))

    // Simulate account change from account manager
    mockMgrSubCb!(["1234"])
    mockMgrSubCb!(["5678"])

    expect(listener).toHaveBeenCalled()
    expect(listener).toHaveBeenCalledTimes(2)
    expect(listener).toHaveBeenNthCalledWith(1, ["0x1234"])
    expect(listener).toHaveBeenNthCalledWith(2, ["0x5678"])
  })

  test("should emit chainChanged", async () => {
    const listener = jest.fn()

    const eventDispatcher = new EventDispatcher(accountManager, networkManager)
    eventDispatcher.on("chainChanged", listener)

    // Initial chain id, should not emit as a change
    $mockChainId.next({isLoading: false, error: null, chainId: 0x286})

    // Change chain id
    $mockChainId.next({isLoading: false, error: null, chainId: 0x2eb})

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith("0x2eb")
  })
})
