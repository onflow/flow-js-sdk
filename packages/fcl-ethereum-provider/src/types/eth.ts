export type EthSignatureResponse = string

export type PersonalSignParams = [string, string]

export interface SignTypedDataParams {
  address: string
  data: TypedData // This represents the EIP-712 structured data
}

export interface TypedDataField {
  name: string
  type: string
}

export interface TypedDataDomain {
  name?: string
  version?: string
  chainId?: number
  verifyingContract?: string
  salt?: string
}

export interface TypedData {
  types: Record<string, TypedDataField[]>
  domain: TypedDataDomain
  primaryType: string
  message: Record<string, any>
}

export interface AddEthereumChainParams {
  chainId: string // Hex string, e.g. "0x1"
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[]
}

export interface SwitchEthereumChainParams {
  chainId: string // Hex string, e.g., "0x64"
}
