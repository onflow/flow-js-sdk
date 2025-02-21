import {withPrefix} from "@onflow/fcl"
import {AccountManager} from "../../accounts/account-manager"

export async function ethAccounts(
  accountManager: AccountManager
): Promise<string[]> {
  const accounts = await accountManager.getAccounts()
  return accounts.map(x => withPrefix(x))
}

export async function ethRequestAccounts(
  accountManager: AccountManager,
  chainId: number
): Promise<string[]> {
  await accountManager.authenticate()
  const accounts = await accountManager.getAndCreateAccounts(chainId)
  return accounts.map(x => withPrefix(x))
}
