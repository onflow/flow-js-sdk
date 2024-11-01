const isServerSide = () => typeof window === "undefined"
const safeParseJSON = (str?: string | null) => {
  if (str == null) return null
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}

export type StorageProvider = {
  can: boolean
  get: (key: string) => Promise<any>
  put: (key: string, value: any) => Promise<void>
}

export const SESSION_STORAGE = {
  can: !isServerSide() && !!window.sessionStorage,
  get: async (key: string) => safeParseJSON(sessionStorage.getItem(key)),
  put: async (key: string, value: any) =>
    sessionStorage.setItem(key, JSON.stringify(value)),
}

export const LOCAL_STORAGE = {
  can: !isServerSide() && !!window.localStorage,
  get: async (key: string) => safeParseJSON(localStorage.getItem(key)),
  put: async (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value)),
}
