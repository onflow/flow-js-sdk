export function createStore<T>(initialState: T) {
  const subscribers = new Set<(state: T) => void>()
  let state = initialState

  const subscribe = (subscriber: (state: T) => void) => {
    subscribers.add(subscriber)
    return () => {
      subscribers.delete(subscriber)
    }
  }

  const setState = (newState: T) => {
    state = newState
    subscribers.forEach(subscriber => subscriber(state))
  }

  const getState = () => state

  return {
    subscribe,
    setState,
    getState,
  }
}
