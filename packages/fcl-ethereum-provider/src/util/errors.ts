export enum ProviderErrorCode {
  // EIP-1193 error codes
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,

  // EIP-1474 / JSON-RPC error codes
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
}
export const ProviderErrorMessage: Record<ProviderErrorCode, string> = {
  // EIP-1193 error messages
  [4001]: "User rejected request",
  [4100]: "Unauthorized",
  [4200]: "Unsupported method",
  [4900]: "Disconnected",
  // EIP-1474 / JSON-RPC error messages
  [-32700]: "Parse error",
  [-32600]: "Invalid request",
  [-32601]: "Method not found",
  [-32602]: "Invalid params",
  [-32603]: "Internal error",
}

export class ProviderError extends Error {
  public code: ProviderErrorCode
  public cause?: any

  constructor({code, cause}: {code: ProviderErrorCode; cause?: any}) {
    super(ProviderErrorMessage[code])
    this.code = code
    this.cause = cause
  }
}
