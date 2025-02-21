import {fclWagmiAdapter} from "@onflow/fcl-wagmi-adapter"
import {RainbowKitWalletConnectParameters, Wallet} from "@rainbow-me/rainbowkit"
import {createConnector} from "@wagmi/core"

type FclConnectorOptions = Parameters<typeof fclWagmiAdapter>[0] & {
  supportsWc?: boolean
  walletConnectParams?: RainbowKitWalletConnectParameters
}

type DefaultWalletOptions = {
  projectId: string
}

const FALLBACK_ICON =
  "https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.svg"

export const createFclConnector = (options: FclConnectorOptions) => {
  const uid = options.service?.uid
  const name = options.service?.provider?.name
  const iconUrl = options.service?.provider?.icon ?? ""
  const rdns = (options.service?.provider as any)?.rdns as string | undefined

  const getUri = (uri: string) => {
    return uri
  }

  return ({projectId}: DefaultWalletOptions): Wallet => ({
    id: uid ? `fcl-${uid}` : "fcl",
    name: name || "Cadence Wallet",
    iconUrl: iconUrl || FALLBACK_ICON,
    iconBackground: "#FFFFFF",
    installed: true,
    downloadUrls: {
      browserExtension:
        "https://chrome.google.com/webstore/detail/flow-wallet/hpclkefagolihohboafpheddmmgdffjm",
      mobile: "https://core.flow.com",
    },
    // Do not list RDNS here since Rainbowkit will discard the wallet
    // when conflicting with an injected wallet
    rdns: undefined,
    createConnector: walletDetails => {
      // TODO, we need to check whether the wallet is installed
      // and use the WalletConnect connector if it is not installed
      const newDetails = {
        ...walletDetails,
        rkDetails: {
          ...walletDetails.rkDetails,
          groupIndex: -1,
          groupName: "Installed",
        },
      }

      const connector = fclWagmiAdapter(options)
      return createConnector(config => {
        return {
          ...connector(config),
          ...newDetails,
        }
      })
    },
  })
}
