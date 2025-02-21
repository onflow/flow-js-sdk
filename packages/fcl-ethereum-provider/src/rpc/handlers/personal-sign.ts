import {AccountManager} from "../../accounts/account-manager"
import {PersonalSignParams} from "../../types/eth"

export async function personalSign(
  accountManager: AccountManager,
  params: PersonalSignParams
) {
  const [message, from] = params

  return await accountManager.signMessage(message, from)
}
