import {NetworkManager} from "../../network/network-manager"
import {formatChainId} from "../../util/eth"

export async function ethChainId(networkManager: NetworkManager) {
  const chainId = await networkManager.getChainId()
  if (!chainId) {
    throw new Error("No active chain")
  }
  return formatChainId(chainId)
}
