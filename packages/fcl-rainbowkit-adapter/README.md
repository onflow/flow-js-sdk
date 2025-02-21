# @onflow/fcl-rainbowkit-adapter

## Usage

```typescript
import { createFclConnector, flowWallet } from '@onflow/fcl-rainbowkit-adapter';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  flowTestnet,
} from 'wagmi/chains';
import * as fcl from '@onflow/fcl';
import { createConfig, http } from 'wagmi';

// Set FCL config
fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "walletconnect.projectId": "9b70cfa398b2355a5eb9b1cf99f4a981",
})

// RainbowKit connectors
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    "wallets": [
      flowWallet(),
    ],
  }
], {
  appName: 'RainbowKit demo',
  projectId: '9b70cfa398b2355a5eb9b1cf99f4a981',
});

// Wagmi config
export const config = createConfig({
  chains: [
    flowTestnet
  ],
  connectors,
  ssr: true,
  transports: {
    [flowTestnet.id]: http(),
  }
});
```