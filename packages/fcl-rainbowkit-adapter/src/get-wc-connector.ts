/*
 * This file is mostly a copy of Rainbowkit's internal get wc connector utility,
 * meant to cache and reuse walletConnect connector instances.
 *
 * The caveat is that we are substituting the original connector with a multi-scoped
 * version that is able to be used in a cross-VM context.
 *
 * See: https://github.com/rainbow-me/rainbowkit/blob/0c9679812123e17b45e1330d5e3b665b48c82864/packages/rainbowkit/src/wallets/getWalletConnectConnector.ts
 */

/*!
 * MIT License
 *
 * Copyright (c) 2024 Rainbow
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {createConnector} from "wagmi"
import type {CreateConnectorFn} from "wagmi"
import {walletConnect, WalletConnectParameters} from "@onflow/fcl-wagmi-adapter"
import type {
  RainbowKitWalletConnectParameters,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit"

type RainbowKitDetails = any
type CreateConnector = (walletDetails: WalletDetailsParams) => CreateConnectorFn

interface GetWalletConnectConnectorParams {
  projectId: string
  walletConnectParameters?: RainbowKitWalletConnectParameters
}

interface CreateWalletConnectConnectorParams {
  projectId: string
  walletDetails: WalletDetailsParams
  walletConnectParameters?: RainbowKitWalletConnectParameters
}

interface GetOrCreateWalletConnectInstanceParams {
  projectId: string
  walletConnectParameters?: RainbowKitWalletConnectParameters
  rkDetailsShowQrModal?: RainbowKitDetails["showQrModal"]
}

const walletConnectInstances = new Map<
  string,
  ReturnType<typeof walletConnect>
>()

// Function to get or create a walletConnect instance
const getOrCreateWalletConnectInstance = ({
  projectId,
  walletConnectParameters,
  rkDetailsShowQrModal,
}: GetOrCreateWalletConnectInstanceParams): ReturnType<
  typeof walletConnect
> => {
  let config: WalletConnectParameters = {
    ...(walletConnectParameters ? walletConnectParameters : {}),
    projectId,
    showQrModal: false, // Required. Otherwise WalletConnect modal (Web3Modal) will popup during time of connection for a wallet
  } as any

  // `rkDetailsShowQrModal` should always be `true`
  if (rkDetailsShowQrModal) {
    config = {...config, showQrModal: true}
  }

  const serializedConfig = JSON.stringify(
    Object.keys(config)
      .sort()
      .reduce((obj: any, key) => {
        obj[key] = config[key as keyof WalletConnectParameters]
        return obj
      }, {} as WalletConnectParameters)
  )

  const sharedWalletConnector = walletConnectInstances.get(serializedConfig)

  if (sharedWalletConnector) {
    return sharedWalletConnector
  }

  // Create a new walletConnect instance and store it
  const newWalletConnectInstance = walletConnect(config)

  walletConnectInstances.set(serializedConfig, newWalletConnectInstance)

  return newWalletConnectInstance
}

// Creates a WalletConnect connector with the given project ID and additional options.
function createWalletConnectConnector({
  projectId,
  walletDetails,
  walletConnectParameters,
}: CreateWalletConnectConnectorParams): CreateConnectorFn {
  // Create and configure the WalletConnect connector with project ID and options.
  return createConnector(config => ({
    ...getOrCreateWalletConnectInstance({
      projectId,
      walletConnectParameters,
      // Used in `connectorsForWallets` to add another
      // walletConnect wallet into rainbowkit with modal popup option
      rkDetailsShowQrModal: walletDetails.rkDetails.showQrModal,
    })(config),
    ...walletDetails,
  }))
}

// Factory function to obtain a configured WalletConnect connector.
export function getWalletConnectConnector({
  projectId,
  walletConnectParameters,
}: GetWalletConnectConnectorParams): CreateConnector {
  // We use this projectId in place of YOUR_PROJECT_ID for our examples.
  // This allows us our examples and templates to be functional with WalletConnect v2.
  // We warn developers against using this projectId in their dApp in production.
  const exampleProjectId = "21fef48091f12692cad574a6f7753643"

  if (!projectId || projectId === "") {
    throw new Error(
      "No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure"
    )
  }

  if (projectId === "YOUR_PROJECT_ID") {
    projectId = exampleProjectId
  }

  // Return a function that merges additional wallet details with `CreateConnectorFn`.
  return (walletDetails: WalletDetailsParams) =>
    createWalletConnectConnector({
      projectId,
      walletDetails,
      walletConnectParameters,
    })
}
