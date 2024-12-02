import WS from "jest-websocket-mock"
import {WebSocket as mockSocket} from "mock-socket"
import {
  Action,
  SubscribeMessageRequest,
  SubscribeMessageResponse,
  SubscriptionDataMessage,
  UnsubscribeMessageRequest,
} from "./models"
import {
  SubscriptionManager,
  SubscriptionManagerConfig,
} from "./subscription-manager"
import {SdkTransport} from "@onflow/typedefs"
import {DataSubscriber, SubscriptionHandler} from "./handlers/types"

jest.mock("./websocket", () => ({
  WebSocket: mockSocket,
}))

describe("SubscriptionManager", () => {
  let mockWs: WS
  let mockSubscriber: jest.Mocked<DataSubscriber<any, any, any>>
  let mockHandler: jest.Mocked<SubscriptionHandler<any>>
  const mockConnectionArgs = {mock: "connection args"}

  beforeEach(() => {
    jest.resetAllMocks()

    mockWs = new WS("wss://localhost:8080")
    mockSubscriber = {
      onData: jest.fn(),
      onError: jest.fn(),
      argsToDto: jest.fn().mockReturnValue(mockConnectionArgs),
      get connectionArgs() {
        return mockConnectionArgs
      },
    }
    mockHandler = {
      topic: "topic",
      createSubscriber: jest.fn().mockReturnValue(mockSubscriber),
    }
  })

  afterEach(() => {
    WS.clean()
  })

  test("does not connect to the socket when no subscriptions are made", async () => {
    new SubscriptionManager([mockHandler], {node: "wss://localhost:8080"})

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(mockWs.server.clients).toHaveLength(0)
  })

  test("disconnects from the socket when the last subscription is removed", async () => {
    const config: SubscriptionManagerConfig = {
      node: "wss://localhost:8080",
    }
    const subscriptionManager = new SubscriptionManager([mockHandler], config)
    const topic = "topic" as SdkTransport.SubscriptionTopic
    const args = {key: "value"} as any
    const onData = jest.fn()
    const onError = jest.fn()

    let serverPromise = (async () => {
      await mockWs.connected

      const msg = (await mockWs.nextMessage) as string
      const data = JSON.parse(msg) as SubscribeMessageRequest
      expect(data).toEqual({
        action: "subscribe",
        topic,
        arguments: mockConnectionArgs,
      })

      const response: SubscribeMessageResponse = {
        id: "id",
        action: Action.SUBSCRIBE,
        success: true,
        topic,
      }
      mockWs.send(JSON.stringify(response))
    })()

    const [subscription] = await Promise.all([
      subscriptionManager.subscribe({
        topic,
        args,
        onData,
        onError,
      }),
      serverPromise,
    ])

    expect(subscription).toBeDefined()
    expect(subscription.unsubscribe).toBeInstanceOf(Function)

    subscription.unsubscribe()
    await new Promise(resolve => setTimeout(resolve, 0))

    await mockWs.closed
    expect(mockWs.server.clients).toHaveLength(0)
  })

  test("subscribes, receives data, and unsubscribes", async () => {
    const config: SubscriptionManagerConfig = {
      node: "wss://localhost:8080",
    }
    const subscriptionManager = new SubscriptionManager([mockHandler], config)
    const topic = "topic" as SdkTransport.SubscriptionTopic
    const args = {key: "value"} as any
    const onData = jest.fn()
    const onError = jest.fn()

    let serverPromise = (async () => {
      await mockWs.connected

      const msg = (await mockWs.nextMessage) as string
      const data = JSON.parse(msg) as SubscribeMessageRequest
      expect(data).toEqual({
        action: "subscribe",
        topic,
        arguments: mockConnectionArgs,
      })

      const response: SubscribeMessageResponse = {
        id: "id",
        action: Action.SUBSCRIBE,
        success: true,
        topic,
      }
      mockWs.send(JSON.stringify(response))
    })()

    const [subscription] = await Promise.all([
      subscriptionManager.subscribe({
        topic,
        args,
        onData,
        onError,
      }),
      serverPromise,
    ])

    expect(subscription).toBeDefined()
    expect(subscription.unsubscribe).toBeInstanceOf(Function)

    serverPromise = (async () => {
      const data = {
        id: "id",
        data: {key: "value"},
      } as SubscriptionDataMessage
      mockWs.send(JSON.stringify(data))
    })()

    await serverPromise

    expect(mockSubscriber.onData).toHaveBeenCalledTimes(1)
    expect(mockSubscriber.onData).toHaveBeenCalledWith({key: "value"})
    expect(mockSubscriber.onError).toHaveBeenCalledTimes(0)

    serverPromise = (async () => {
      const msg = (await mockWs.nextMessage) as string
      const data = JSON.parse(msg) as UnsubscribeMessageRequest
      expect(data).toEqual({
        action: "unsubscribe",
        id: "id",
      })
    })()

    subscription.unsubscribe()
    await serverPromise
  })

  test("reconnects to stream on close", async () => {
    const config: SubscriptionManagerConfig = {
      node: "wss://localhost:8080",
    }
    const subscriptionManager = new SubscriptionManager([mockHandler], config)
    const topic = "topic" as SdkTransport.SubscriptionTopic
    const args = {key: "value"} as any
    const onData = jest.fn()
    const onError = jest.fn()

    let serverPromise = (async () => {
      await mockWs.connected

      const msg = (await mockWs.nextMessage) as string
      const data = JSON.parse(msg) as SubscribeMessageRequest
      expect(data).toEqual({
        action: "subscribe",
        topic,
        arguments: mockConnectionArgs,
      })

      const response: SubscribeMessageResponse = {
        id: "id1",
        action: Action.SUBSCRIBE,
        success: true,
        topic,
      }
      mockWs.send(JSON.stringify(response))
    })()

    const [subscription] = await Promise.all([
      subscriptionManager.subscribe({
        topic,
        args,
        onData,
        onError,
      }),
      serverPromise,
    ])

    expect(subscription).toBeDefined()
    expect(subscription.unsubscribe).toBeInstanceOf(Function)
    expect(mockHandler.createSubscriber).toHaveBeenCalledTimes(1)
    expect(mockHandler.createSubscriber).toHaveBeenCalledWith(
      args,
      onData,
      onError
    )

    serverPromise = (async () => {
      const data = {
        id: "id1",
        data: {key: "value"},
      } as SubscriptionDataMessage
      mockWs.send(JSON.stringify(data))
    })()

    await serverPromise

    expect(mockSubscriber.onData).toHaveBeenCalledTimes(1)
    expect(mockSubscriber.onData).toHaveBeenCalledWith({key: "value"})
    expect(mockSubscriber.onError).toHaveBeenCalledTimes(0)

    // Close the connection and create a new one
    mockWs.close()
    mockWs = new WS("wss://localhost:8080")

    serverPromise = (async () => {
      await mockWs.connected

      const msg = (await mockWs.nextMessage) as string
      const data = JSON.parse(msg) as SubscribeMessageRequest
      expect(data).toEqual({
        action: "subscribe",
        topic,
        arguments: mockConnectionArgs,
      })

      const response: SubscribeMessageResponse = {
        id: "id2",
        action: Action.SUBSCRIBE,
        success: true,
        topic,
      }
      mockWs.send(JSON.stringify(response))
    })()

    await serverPromise

    // Wait for client to register the new subscription
    await new Promise(resolve => setTimeout(resolve, 0))

    serverPromise = (async () => {
      const data = {
        id: "id2",
        data: {key: "value2"},
      } as SubscriptionDataMessage
      mockWs.send(JSON.stringify(data))
    })()

    await serverPromise

    expect(mockSubscriber.onData).toHaveBeenCalledTimes(2)
    expect(mockSubscriber.onData.mock.calls[1]).toEqual([{key: "value2"}])
  })
})
