import {
  Action,
  MessageResponse,
  SubscriptionDataMessage,
  UnsubscribeMessageResponse,
} from "./models"
import {
  SubscribeMessageRequest,
  SubscribeMessageResponse,
  UnsubscribeMessageRequest,
} from "./models"
import {SdkTransport} from "@onflow/typedefs"
import {WebSocket} from "./websocket"
import {DataSubscriber, SubscriptionHandler} from "./handlers/types"
import * as logger from "@onflow/util-logger"

const WS_OPEN = 1

type DeepRequired<T> = Required<{
  [K in keyof T]: DeepRequired<T[K]>
}>

type InferHandler<T> = T extends SubscriptionHandler<infer H> ? H : never

interface SubscriptionInfo<T extends DataSubscriber<any, any, any>> {
  // Internal ID for the subscription
  id: number
  // Remote ID assigned by the server used for message routing and unsubscribing
  remoteId?: string
  // The topic of the subscription
  topic: string
  // Data provider for the subscription
  subscriber: DataSubscriber<any, any, any>
}

export interface SubscriptionManagerConfig {
  /**
   * The URL of the node to connect to
   */
  node: string
  /**
   * Options for reconnecting to the server
   */
  reconnectOptions?: {
    /**
     * The initial delay in milliseconds before reconnecting
     * @default 500
     */
    initialReconnectDelay?: number
    /**
     * The maximum number of reconnection attempts
     * @default 5
     */
    reconnectAttempts?: number
    /**
     * The maximum delay in milliseconds between reconnection attempts
     * @default 5000
     */
    maxReconnectDelay?: number
  }
}

export class SubscriptionManager<
  Handlers extends [...SubscriptionHandler<any>[]],
> {
  private counter = 0
  private socket: WebSocket | null = null
  private subscriptions: SubscriptionInfo<DataSubscriber<any, any, any>>[] = []
  private config: DeepRequired<SubscriptionManagerConfig>
  private reconnectAttempts = 0
  private handlers: Record<string, SubscriptionHandler<any>>

  constructor(handlers: Handlers, config: SubscriptionManagerConfig) {
    this.config = {
      ...config,
      reconnectOptions: {
        initialReconnectDelay: 500,
        reconnectAttempts: 5,
        maxReconnectDelay: 5000,
        ...config.reconnectOptions,
      },
    }

    // Map data providers by topic
    this.handlers = handlers.reduce(
      (acc, handler) => {
        acc[handler.topic] = handler
        return acc
      },
      {} as Record<string, SubscriptionHandler<any>>
    )
  }

  // Lazy connect to the socket when the first subscription is made
  private async connect() {
    return new Promise<void>((resolve, reject) => {
      // If the socket is already open, do nothing
      if (this.socket?.readyState === WS_OPEN) {
        return
      }

      this.socket = new WebSocket(this.config.node)
      this.socket.onmessage = event => {
        const message = JSON.parse(event.data) as
          | MessageResponse
          | SubscriptionDataMessage

        if ("action" in message) {
          // TODO, waiting for AN team to decide what to do here
        } else {
          // Update the block height to checkpoint for disconnects
          this.handleSubscriptionData(message)
        }
      }
      this.socket.onclose = () => {
        void this.reconnect()
      }
      this.socket.onerror = e => {
        this.reconnect(e)
      }

      this.socket.onopen = () => {
        // Restore subscriptions
        Promise.all(
          this.subscriptions.map(async sub => {
            const response = await this.sendSubscribe(sub)
            sub.remoteId = response.id
          })
        )
          .then(() => {
            resolve()
          })
          .catch(e => {
            reject(new Error(`Failed to restore subscriptions: ${e}`))
          })
      }
    })
  }

  private async reconnect(error?: any) {
    // Clear the socket
    this.socket = null

    // If there are no subscriptions, do nothing
    if (this.subscriptions.length === 0) {
      return
    }

    // Clear all remote ids
    this.subscriptions.forEach(sub => {
      delete sub.remoteId
    })

    // Validate the number of reconnection attempts
    if (
      this.reconnectAttempts >= this.config.reconnectOptions.reconnectAttempts
    ) {
      logger.log({
        level: logger.LEVELS.error,
        title: "WebSocket Error",
        message: `Failed to reconnect to the server after ${this.reconnectAttempts + 1} attempts: ${error}`,
      })

      this.subscriptions.forEach(sub => {
        sub.subscriber.onError(
          new Error(
            `Failed to reconnect to the server after ${this.reconnectAttempts + 1} attempts: ${error}`
          )
        )
      })
      this.subscriptions = []
      this.reconnectAttempts = 0
    } else {
      logger.log({
        level: logger.LEVELS.warn,
        title: "WebSocket Error",
        message: `WebSocket error, reconnecting in ${this.backoffInterval}ms: ${error}`,
      })

      // Delay the reconnection
      await new Promise(resolve => setTimeout(resolve, this.backoffInterval))

      // Try to reconnect
      this.reconnectAttempts++
      await this.connect()
      this.reconnectAttempts = 0
    }
  }

  async subscribe<T extends Handlers[number]>(opts: {
    topic: InferHandler<T>["Topic"]
    args: InferHandler<T>["Args"]
    onData: (data: InferHandler<T>["Data"]) => void
    onError: (error: Error) => void
  }): Promise<SdkTransport.Subscription> {
    // Connect the socket if it's not already open
    await this.connect()

    // Get the data provider for the topic
    const topicHandler = this.getHandler(opts.topic)
    const subscriber = topicHandler.createSubscriber(
      opts.args,
      opts.onData,
      opts.onError
    )

    // Track the subscription locally
    const sub: SubscriptionInfo<DataSubscriber<any, any, any>> = {
      id: this.counter++,
      topic: opts.topic,
      subscriber: subscriber,
    }
    this.subscriptions.push(sub)

    // Send the subscribe message
    const response = await this.sendSubscribe(sub)

    if (!response.success) {
      throw new Error(
        `Failed to subscribe to topic ${sub.topic}, error message: ${response.error_message}`
      )
    }

    // Update the subscription with the remote id
    sub.remoteId = response.id

    return {
      unsubscribe: () => this.unsubscribe(sub.id),
    }
  }

  private unsubscribe(id: number): void {
    // Get the subscription
    const sub = this.subscriptions.find(sub => sub.id === id)
    if (!sub) return

    // Send the unsubscribe message
    this.sendUnsubscribe(sub).catch(e => {
      console.error(
        `Failed to unsubscribe from topic ${sub.topic}, error: ${e}`
      )
    })

    // Remove the subscription
    this.subscriptions = this.subscriptions.filter(sub => sub.id !== id)

    // Close the socket if there are no more subscriptions
    if (this.subscriptions.length === 0) {
      this.socket?.close()
    }
  }

  private async sendSubscribe(
    sub: SubscriptionInfo<DataSubscriber<any, any, any>>
  ) {
    // Send the subscription message
    const request: SubscribeMessageRequest = {
      action: Action.SUBSCRIBE,
      topic: sub.topic,
      arguments: sub.subscriber.connectionArgs,
    }
    this.socket?.send(JSON.stringify(request))

    const response: SubscribeMessageResponse = await this.waitForResponse()

    if (!response.success) {
      throw new Error(
        `Failed to subscribe to topic ${sub.topic}, error message: ${response.error_message}`
      )
    }

    return response
  }

  private async sendUnsubscribe(
    sub: SubscriptionInfo<DataSubscriber<any, any, any>>
  ) {
    // Send the unsubscribe message if the subscription has a remote id
    const {remoteId} = sub
    if (remoteId) {
      const request: UnsubscribeMessageRequest = {
        action: Action.UNSUBSCRIBE,
        id: remoteId,
      }
      this.socket?.send(JSON.stringify(request))

      const response: UnsubscribeMessageResponse = await this.waitForResponse()

      if (!response.success) {
        throw new Error(
          `Failed to unsubscribe from topic ${sub.topic}, error message: ${response.error_message}`
        )
      }
    }
  }

  private async waitForResponse<T extends MessageResponse>(): Promise<T> {
    // TODO: NOOP, waiting for AN team to decide what to do here, this is a placeholder
    return new Promise(resolve => {
      this.socket?.addEventListener("message", event => {
        const data = JSON.parse(event.data) as T
        if (data.action) {
          resolve(data)
        }
      })
    })
  }

  // Update the subscription checkpoint when a message is received
  // These checkpoints are used to resume subscriptions after disconnects
  private handleSubscriptionData<
    T extends SdkTransport.SubscriptionTopic = SdkTransport.SubscriptionTopic,
  >(message: SubscriptionDataMessage) {
    // Get the subscription
    const sub = this.subscriptions.find(sub => sub.remoteId === message.id)
    if (!sub) {
      throw new Error(`No subscription found for id ${message.id}`)
    }

    // Send data to the subscriber
    sub.subscriber.onData(message.data)
  }

  private getHandler(topic: string) {
    const handler = this.handlers[topic]
    if (!handler) {
      throw new Error(`No handler found for topic ${topic}`)
    }
    return handler
  }

  /**
   * Calculate the backoff interval for reconnection attempts
   * @returns The backoff interval in milliseconds
   */
  private get backoffInterval() {
    return Math.min(
      this.config.reconnectOptions.maxReconnectDelay,
      this.config.reconnectOptions.initialReconnectDelay *
        2 ** this.reconnectAttempts
    )
  }
}
