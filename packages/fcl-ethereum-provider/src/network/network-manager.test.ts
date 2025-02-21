import {mockConfig} from "../__mocks__/fcl"
import {NetworkManager} from "./network-manager"
import * as fcl from "@onflow/fcl"

jest.mock("@onflow/fcl", () => {
  return {
    getChainId: jest.fn(),
  }
})

describe("network manager", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("getChainId should return correct chain id mainnet", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("mainnet")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })
    const manager = new NetworkManager(config.mock)
    const chainId = await manager.getChainId()

    expect(chainId).toBe(747)
  })

  test("getChainId should return correct chain id testnet", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("testnet")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })
    const manager = new NetworkManager(config.mock)
    const chainId = await manager.getChainId()

    expect(chainId).toBe(545)
  })

  test("getChainId should throw error on unknown network", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("unknown")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })

    const manager = new NetworkManager(config.mock)
    await expect(manager.getChainId()).rejects.toThrow("Unknown network")
  })

  test("getChainId should throw error on error", async () => {
    jest.mocked(fcl.getChainId).mockRejectedValue(new Error("error"))

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })

    const manager = new NetworkManager(config.mock)
    await expect(manager.getChainId()).rejects.toThrow("error")
  })

  test("subscribe should return correct chain id", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("mainnet")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })

    const manager = new NetworkManager(config.mock)
    const chainId = await new Promise<number>(resolve => {
      const unsub = manager.$chainId.subscribe(({chainId}) => {
        if (chainId) {
          resolve(chainId)
          unsub()
        }
      })
    })

    expect(chainId).toBe(747)
  })

  test("subscribe should update chain id", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("mainnet")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })

    const manager = new NetworkManager(config.mock)

    const chainIds: number[] = []

    const unsub = manager.$chainId.subscribe(({chainId}) => {
      if (chainId) {
        chainIds.push(chainId)
      }
    })

    await config.set({
      "accessNode.api": "https://example2.com",
    })

    await config.set({
      "accessNode.api": "https://example3.com",
    })

    unsub()

    expect(chainIds).toEqual([747, 747, 747])
    expect(fcl.getChainId).toHaveBeenCalledTimes(3)
  })

  test("should not query chain id multiple times for same access node", async () => {
    jest.mocked(fcl.getChainId).mockResolvedValue("mainnet")

    const config = mockConfig()
    await config.set({
      "accessNode.api": "https://example.com",
    })

    const manager = new NetworkManager(config.mock)

    await manager.getChainId()
    await manager.getChainId()
    await manager.getChainId()

    expect(fcl.getChainId).toHaveBeenCalledTimes(1)
  })
})
