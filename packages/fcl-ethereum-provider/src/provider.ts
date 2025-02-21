import {
  Eip1193Provider,
  EventCallback,
  ProviderEvents,
  ProviderRequest,
  ProviderResponse,
} from "./types/provider"
import {RpcProcessor} from "./rpc/rpc-processor"
import {EventDispatcher} from "./events/event-dispatcher"
import {ProviderError, ProviderErrorCode} from "./util/errors"
import {AccountManager} from "./accounts/account-manager"

export class FclEthereumProvider implements Eip1193Provider {
  constructor(
    private acountManager: AccountManager,
    private rpcProcessor: RpcProcessor,
    private eventDispatcher: EventDispatcher
  ) {}

  // Handle requests
  async request<T = unknown>({
    method,
    params,
  }: ProviderRequest): Promise<ProviderResponse<T>> {
    if (!method) {
      throw new Error("Method is required")
    }
    const result = await this.rpcProcessor.handleRequest({method, params})
    return result
  }

  async disconnect(): Promise<void> {
    await this.acountManager.unauthenticate()
  }

  // Listen to events
  on<E extends keyof ProviderEvents>(
    event: E,
    listener: EventCallback<ProviderEvents[E]>
  ): void {
    this.eventDispatcher.on(event, listener)
  }

  // Remove event listeners
  removeListener<E extends keyof ProviderEvents>(
    event: E,
    listener: EventCallback<ProviderEvents[E]>
  ): void {
    this.eventDispatcher.off(event, listener)
  }
}
