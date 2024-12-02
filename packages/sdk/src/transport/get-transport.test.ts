import {SdkTransport} from "@onflow/typedefs"
import {getTransport} from "./get-transport"
import {httpTransport} from "@onflow/transport-http"
import {config} from "@onflow/config"

jest.mock("@onflow/transport-http", () => ({
  httpTransport: {
    send: jest.fn(),
    subscribe: jest.fn(),
  } as jest.Mocked<SdkTransport.Transport>,
}))

describe("getTransport", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("fallback to http transport", async () => {
    const transport = await getTransport()
    expect(transport).toBe(httpTransport)
  })

  test("override with custom transport", async () => {
    const customTransport = {
      send: jest.fn(),
      subscribe: jest.fn(),
    } as jest.Mocked<SdkTransport.Transport>

    const transport = await getTransport({transport: customTransport})
    expect(transport).toBe(customTransport)
  })

  test("override with custom send function", async () => {
    const customSend = jest.fn()

    const transport = await getTransport({send: customSend})
    expect(transport).toEqual({
      send: customSend,
      subscribe: expect.any(Function),
    })
  })

  test("override with both custom transport and send function", async () => {
    await expect(
      getTransport({
        send: jest.fn(),
        transport: {
          send: jest.fn(),
          subscribe: jest.fn(),
        },
      })
    ).rejects.toThrow(
      /Cannot provide both "transport" and legacy "send" options/
    )
  })

  test("transport from global config - sdk.transport", async () => {
    const customTransport = {
      send: jest.fn(),
      subscribe: jest.fn(),
    } as jest.Mocked<SdkTransport.Transport>

    const tranpsort = await config().overload(
      {
        "sdk.transport": customTransport,
      },
      async () => {
        return await getTransport()
      }
    )

    expect(tranpsort).toBe(customTransport)
  })

  test("send function from global config - sdk.transport", async () => {
    const customSend = jest.fn()

    const transport = await config().overload(
      {
        "sdk.transport": customSend,
      },
      async () => {
        return await getTransport()
      }
    )
    expect(transport).toEqual({
      send: customSend,
      subscribe: expect.any(Function),
    })
  })

  test("send function from global config - sdk.send", async () => {
    const customSend = jest.fn()

    const transport = await config().overload(
      {
        "sdk.send": customSend,
      },
      async () => {
        return await getTransport()
      }
    )

    expect(transport).toEqual({
      send: customSend,
      subscribe: expect.any(Function),
    })
  })

  test("custom transport has priority over global config", async () => {
    const customTransport = {
      send: jest.fn(),
      subscribe: jest.fn(),
    } as jest.Mocked<SdkTransport.Transport>

    const transport = await config().overload(
      {
        "sdk.transport": httpTransport,
      },
      async () => {
        return await getTransport({transport: customTransport})
      }
    )

    expect(transport).toBe(customTransport)
  })
})
