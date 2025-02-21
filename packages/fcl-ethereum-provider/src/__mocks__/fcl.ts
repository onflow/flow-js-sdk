import * as fcl from "@onflow/fcl"
import {CurrentUser} from "@onflow/typedefs"

export function mockUser(initialValue?: CurrentUser | null) {
  if (!initialValue) {
    initialValue = {
      loggedIn: false,
    } as CurrentUser
  }
  let value: CurrentUser = initialValue
  let subscribers: ((cfg: CurrentUser, err: Error | null) => void)[] = []
  const currentUser = {
    authenticate: jest.fn(),
    unauthenticate: jest.fn(),
    authorization: jest.fn(),
    signUserMessage: jest.fn(),
    subscribe: jest.fn().mockImplementation(cb => {
      cb(value)
      subscribers.push(cb)
      return () => {
        subscribers = subscribers.filter(s => s !== cb)
      }
    }),
    snapshot: jest.fn(),
    resolveArgument: jest.fn(),
  }

  const mock: jest.Mocked<typeof fcl.currentUser> = Object.assign(
    () => {
      return {...currentUser}
    },
    {...currentUser}
  )

  return {
    mock,
    set: async (cfg: CurrentUser) => {
      value = cfg
      subscribers.forEach(s => s(cfg, null))
      await new Promise(resolve => setTimeout(resolve, 0))
    },
  }
}

export function mockConfig(
  {
    initialValue,
  }: {
    initialValue: Record<string, any> | null
  } = {initialValue: null}
) {
  let value = initialValue
  let subscribers: ((cfg: Record<string, any>, err: Error | null) => void)[] =
    []

  const config = {
    put: jest.fn(),
    get: jest.fn(),
    all: jest.fn(),
    first: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
    subscribe: jest.fn().mockImplementation(cb => {
      cb(value, null)
      subscribers.push(cb)
      return () => {
        subscribers = subscribers.filter(s => s !== cb)
      }
    }),
    overload: jest.fn(),
    load: jest.fn(),
  }

  const cfg: jest.Mocked<typeof fcl.config> = Object.assign(
    () => {
      return {...config}
    },
    {...config}
  )

  return {
    mock: cfg,
    set: async (cfg: Record<string, any>) => {
      value = cfg
      subscribers.forEach(s => s(cfg, null))
      await new Promise(resolve => setTimeout(resolve, 0))
    },
  }
}
