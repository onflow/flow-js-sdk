import {Service} from "@onflow/typedefs"
import {createFclConnector} from "./create-connector"
import * as fcl from "@onflow/fcl"

export const flowWallet = (params: {
  user: typeof fcl.currentUser
  config: typeof fcl.config
}) =>
  createFclConnector({
    user: params.user || fcl.currentUser,
    config: params.config || fcl.config,
    service: {
      f_type: "Service",
      f_vsn: "1.0.0",
      type: "authn",
      uid: "Flow Wallet",
      endpoint:
        "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html",
      method: "EXT/RPC",
      id: "hpclkefagolihohboafpheddmmgdffjm",
      identity: {
        address: "0x33f75ff0b830dcec",
      },
      provider: {
        name: "Flow Wallet",
        address: "0x33f75ff0b830dcec",
        description: "A wallet created for everyone",
        icon: "https://lilico.app/frw-logo.png",
        color: "#41CC5D",
        website: "https://core.flow.com",
        requires_install: true,
        is_installed: true,
        install_link:
          "https://chromewebstore.google.com/detail/flow-wallet/hpclkefagolihohboafpheddmmgdffjm",
        rdns: "com.flowfoundation.wallet",
      },
    } as unknown as Service,
  })
