'use client'; // This component will run on the client side


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  bsc,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { http } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  phantomWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';


import configs from './client-components/config.main.json'
import { getRandomItemFromArray } from './client-components/services/utils';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        coinbaseWallet,
        phantomWallet,
        walletConnectWallet,
      ],
    },
  ],
  { appName: 'abc', projectId: 'f4fcaa8162f29cf1ca29a266f69ae98a' },
);


const config = getDefaultConfig({
    connectors,
    appName: 'RainbowKit App',
    projectId: 'f4fcaa8162f29cf1ca29a266f69ae98a',
    chains: [mainnet, bsc],
    transports:{
      [mainnet.id]:http(getRandomItemFromArray(configs.ETH?.RPC_APIs)),
      [bsc.id]:http(getRandomItemFromArray(configs.ETH?.RPC_APIs))
    },
    ssr: false, // If your dApp uses server side rendering (SSR)
  });
  
const queryClient = new QueryClient();

export const WalletProvider = ({ children }) => {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()} modalSize='compact'>
                {children}
                <ConnectButton />;
            </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  };