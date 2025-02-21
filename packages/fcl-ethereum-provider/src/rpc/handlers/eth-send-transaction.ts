import {AccountManager} from "../../accounts/account-manager"
import {NetworkManager} from "../../network/network-manager"

export async function ethSendTransaction(
  accountManager: AccountManager,
  networkManager: NetworkManager,
  params: any
) {
  return await accountManager.sendTransaction({
    ...params[0],
    // We pass the chainId to avoid race conditions where the chainId changes
    chainId: await networkManager.getChainId(),
  })
}
