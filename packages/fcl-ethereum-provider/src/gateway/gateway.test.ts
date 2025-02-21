import HttpConnection from "@walletconnect/jsonrpc-http-connection"
import {Gateway} from "./gateway"
import {JsonRpcProvider} from "@walletconnect/jsonrpc-provider"

jest.mock("@walletconnect/jsonrpc-http-connection")
jest.mock("@walletconnect/jsonrpc-provider")

describe("gateway", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("request should work for mainnet", async () => {
    const gateway = new Gateway({
      747: "https://example.com",
      545: "https://example.com/testnet",
    })

    jest.mocked(JsonRpcProvider).mockImplementation(
      jest.fn(
        () =>
          ({
            request: jest.fn().mockResolvedValue(["0x123"]),
          }) as any as JsonRpcProvider
      )
    )

    const returnValue = await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 747,
    })

    // Check that the arguments are correct
    expect(
      jest.mocked(JsonRpcProvider).mock.results[0].value.request
    ).toHaveBeenCalledWith({method: "eth_accounts", params: []})

    // Check that the return value propogates correctly
    expect(returnValue).toEqual(["0x123"])

    // Verify that the mainnet provider was used
    expect(JsonRpcProvider).toHaveBeenCalled()
    expect(JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(JsonRpcProvider).toHaveBeenCalledWith(
      jest.mocked(HttpConnection).mock.instances[0]
    )
    expect(HttpConnection).toHaveBeenCalledWith("https://example.com")
  })

  test("request should work for testnet", async () => {
    const gateway = new Gateway({
      747: "https://example.com",
      545: "https://example.com/testnet",
    })

    jest.mocked(JsonRpcProvider).mockImplementation(
      jest.fn(
        () =>
          ({
            request: jest.fn().mockResolvedValue(["0x123"]),
          }) as any as JsonRpcProvider
      )
    )

    const returnValue = await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 545,
    })

    // Check that the arguments are correct
    expect(
      jest.mocked(JsonRpcProvider).mock.results[0].value.request
    ).toHaveBeenCalledWith({method: "eth_accounts", params: []})

    // Check that the return value propogates correctly
    expect(returnValue).toEqual(["0x123"])

    // Verify that the testnet provider was used
    expect(JsonRpcProvider).toHaveBeenCalled()
    expect(JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(JsonRpcProvider).toHaveBeenCalledWith(
      jest.mocked(HttpConnection).mock.instances[0]
    )
    expect(HttpConnection).toHaveBeenCalledWith("https://example.com/testnet")
  })

  test("subsequent requests should use the same provider", async () => {
    const gateway = new Gateway({
      747: "https://example.com",
      545: "https://example.com/testnet",
    })

    jest.mocked(JsonRpcProvider).mockImplementation(
      jest.fn(
        () =>
          ({
            request: jest.fn().mockResolvedValue(["0x123"]),
          }) as any as JsonRpcProvider
      )
    )

    await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 545,
    })

    await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 545,
    })

    // Verify that the testnet provider was used
    expect(JsonRpcProvider).toHaveBeenCalled()
    expect(JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(JsonRpcProvider).toHaveBeenCalledWith(
      jest.mocked(HttpConnection).mock.instances[0]
    )
    expect(HttpConnection).toHaveBeenCalledWith("https://example.com/testnet")
  })

  test("request should throw if chainId is not found", async () => {
    const gateway = new Gateway({
      747: "https://example.com",
      545: "https://example.com/testnet",
    })

    await expect(
      gateway.request({
        method: "eth_accounts",
        params: [],
        chainId: 123,
      })
    ).rejects.toThrow("RPC URL not found for chainId 123")
  })

  test("should default to public gateway mainnet", async () => {
    const gateway = new Gateway({})

    jest.mocked(JsonRpcProvider).mockImplementation(
      jest.fn(
        () =>
          ({
            request: jest.fn().mockResolvedValue(["0x123"]),
          }) as any as JsonRpcProvider
      )
    )

    await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 747,
    })

    // Verify that the mainnet provider was used
    expect(JsonRpcProvider).toHaveBeenCalled()
    expect(JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(JsonRpcProvider).toHaveBeenCalledWith(
      jest.mocked(HttpConnection).mock.instances[0]
    )
    expect(HttpConnection).toHaveBeenCalledWith(
      "https://mainnet.evm.nodes.onflow.org"
    )
  })

  test("should default to public gateway testnet", async () => {
    const gateway = new Gateway({})

    jest.mocked(JsonRpcProvider).mockImplementation(
      jest.fn(
        () =>
          ({
            request: jest.fn().mockResolvedValue(["0x123"]),
          }) as any as JsonRpcProvider
      )
    )

    await gateway.request({
      method: "eth_accounts",
      params: [],
      chainId: 545,
    })

    // Verify that the testnet provider was used
    expect(JsonRpcProvider).toHaveBeenCalled()
    expect(JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(JsonRpcProvider).toHaveBeenCalledWith(
      jest.mocked(HttpConnection).mock.instances[0]
    )
    expect(HttpConnection).toHaveBeenCalledWith(
      "https://testnet.evm.nodes.onflow.org"
    )
  })
})
