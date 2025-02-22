import {AccountManager} from "../../accounts/account-manager"
import {SignTypedDataParams, TypedData} from "../../types/eth"
import {
  hashTypedDataLegacy,
  hashTypedDataV3,
  hashTypedDataV4,
} from "../../util/hash"

export async function signTypedData(
  accountManager: AccountManager,
  params: unknown,
  version: "eth_signTypedData" | "eth_signTypedData_v3" | "eth_signTypedData_v4"
) {
  const {address, data} = parseParams(params, version)

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

function parseParams(
  params: unknown,
  version: "eth_signTypedData" | "eth_signTypedData_v3" | "eth_signTypedData_v4"
): {address: string; data: TypedData} {
  try {
    if (!params || typeof params !== "object") {
      throw new Error(`${version} requires valid parameters.`)
    }

    const [address, data] = params as [unknown, unknown]

    if (typeof data !== "object") {
      return {address: address as string, data: JSON.parse(data as string)}
    } else {
      return {address: address as string, data: data as TypedData}
    }
  } catch (error) {
    throw new Error(`${version} requires valid parameters.`)
  }
}
