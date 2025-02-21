import {
  ContractType,
  FLOW_CHAINS,
  FLOW_CONTRACTS,
  FlowNetwork,
} from "../constants"
import * as fcl from "@onflow/fcl"

export function formatChainId(chainId: string | number): `0x${string}` {
  const numericChainId =
    typeof chainId === "string" ? parseInt(chainId) : chainId
  return `0x${numericChainId.toString(16)}`
}

export function getContractAddress(
  contractType: ContractType,
  chainId: number
) {
  // Find the Flow network based on the chain ID
  const flowNetwork = Object.entries(FLOW_CHAINS).find(
    ([, chain]) => chain.eip155ChainId === chainId
  )?.[0] as FlowNetwork | undefined

  if (!flowNetwork) {
    throw new Error("Flow network not found for chain ID")
  }

  const evmContractAddress = fcl.withPrefix(
    FLOW_CONTRACTS[contractType][flowNetwork]
  )
  return evmContractAddress
}
