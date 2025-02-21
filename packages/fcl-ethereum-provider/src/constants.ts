export enum FlowNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

export const FLOW_CHAINS = {
  [FlowNetwork.MAINNET]: {
    eip155ChainId: 747,
    publicRpcUrl: "https://mainnet.evm.nodes.onflow.org",
  },
  [FlowNetwork.TESTNET]: {
    eip155ChainId: 545,
    publicRpcUrl: "https://testnet.evm.nodes.onflow.org",
  },
}

export enum ContractType {
  EVM = "EVM",
}

export enum EventType {
  CADENCE_OWNED_ACCOUNT_CREATED = "CADENCE_OWNED_ACCOUNT_CREATED",
  TRANSACTION_EXECUTED = "TRANSACTION_EXECUTED",
}

export const EVENT_IDENTIFIERS = {
  [EventType.TRANSACTION_EXECUTED]: {
    [FlowNetwork.TESTNET]: "A.8c5303eaa26202d6.EVM.TransactionExecuted",
    [FlowNetwork.MAINNET]: "A.e467b9dd11fa00df.EVM.TransactionExecuted",
  },
  [EventType.CADENCE_OWNED_ACCOUNT_CREATED]: {
    [FlowNetwork.TESTNET]: "A.8c5303eaa26202d6.EVM.CadenceOwnedAccountCreated",
    [FlowNetwork.MAINNET]: "A.e467b9dd11fa00df.EVM.CadenceOwnedAccountCreated",
  },
}

export const FLOW_CONTRACTS = {
  [ContractType.EVM]: {
    [FlowNetwork.TESTNET]: "0x8c5303eaa26202d6",
    [FlowNetwork.MAINNET]: "0xe467b9dd11fa00df",
  },
}

export interface TransactionExecutedEvent {
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

export const ACCESS_NODE_API_KEY = "accessNode.api"

// TODO: This is a fixed value matching what is used by Flow Wallet right now.
// We should investigate whether eth_estimateGas can be used (& should be used) to get a more accurate value.
export const DEFAULT_EVM_GAS_LIMIT = "0x76c0"
