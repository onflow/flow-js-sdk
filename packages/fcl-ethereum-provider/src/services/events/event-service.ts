import {EventCallback, ProviderEvents} from "../../types/provider"
import EventEmitter from "events"

export class EventService {
  private eventEmitter = new EventEmitter()

  constructor() {}

  // Listen to events
  on<E extends keyof ProviderEvents>(
    event: E,
    listener: EventCallback<ProviderEvents[E]>
  ): void {
    this.eventEmitter.on(event, listener)
  }

  // Remove event listeners
  off<E extends keyof ProviderEvents>(
    event: E,
    listener: EventCallback<ProviderEvents[E]>
  ): void {
    this.eventEmitter.off(event, listener)
  }

  // Emit events (to be called internally)
  protected emit<E extends keyof ProviderEvents>(
    event: E,
    data: ProviderEvents[E]
  ) {
    this.eventEmitter.emit(event, data)
  }
}
