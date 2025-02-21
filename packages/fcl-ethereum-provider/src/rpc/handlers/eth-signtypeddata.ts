import {AccountManager} from "../../accounts/account-manager"
import {SignTypedDataParams} from "../../types/eth"
import {
  hashTypedDataLegacy,
  hashTypedDataV3,
  hashTypedDataV4,
} from "../../hash-utils"

export async function signTypedData(
  accountManager: AccountManager,
  params: SignTypedDataParams,
  version: "eth_signTypedData" | "eth_signTypedData_v3" | "eth_signTypedData_v4"
) {
  const {address, data} = params

  if (!address || !data) {
    throw new Error("Missing signer address or typed data")
  }

  let hashedMessage: string
  if (version === "eth_signTypedData_v3") {
    hashedMessage = hashTypedDataV3(data)
  } else if (version === "eth_signTypedData_v4") {
    hashedMessage = hashTypedDataV4(data)
  } else {
    hashedMessage = hashTypedDataLegacy(data)
  }

  return await accountManager.signMessage(hashedMessage, address)
}
