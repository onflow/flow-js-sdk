export type TransactionExecutedEvent = {
  hash: string[]
  index: string
  type: string
  payload: string[]
  errorCode: string
  errorMessage: string
  gasConsumed: string
  contractAddress: string
  logs: string[]
  blockHeight: string
  returnedData: string[]
  precompiledCalls: string[]
  stateUpdateChecksum: string
}
