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
  base,
  optimism,
  arbitrum,
  sepolia
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
import { Erc20WalletProvider } from './erc20wallet-provider';

import configs from './client-components/config.main.json'
import { getRandomItemFromArray } from './client-components/services/utils';
import { useGlobalConfig } from './globalConfig-provider';

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


const queryClient = new QueryClient();

export const WalletProvider = ({ children }) => {
    const configs = useGlobalConfig()

    const config = getDefaultConfig({
        connectors,
        appName: 'RainbowKit App',
        projectId: 'f4fcaa8162f29cf1ca29a266f69ae98a',
        chains: [mainnet, bsc, base, optimism, arbitrum, sepolia],
        // transports:{
        //   [mainnet.id]:http(getRandomItemFromArray(configs?.ETH?.RPC_APIs, "")),
        //   [bsc.id]:http(getRandomItemFromArray(configs?.BSC?.RPC_APIs)),
        //   [base.id]:http(getRandomItemFromArray(configs?.BASE?.RPC_APIs)),
        //   [optimism.id]:http(getRandomItemFromArray(configs?.OP?.RPC_APIs)),
        //   [arbitrum.id]:http(getRandomItemFromArray(configs?.ARB?.RPC_APIs))
        // },
        ssr: false, // If your dApp uses server side rendering (SSR)
      });
      
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()} modalSize='compact'>
                <Erc20WalletProvider globalConfigs={configs}>
                    {children}
                </Erc20WalletProvider>
            </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  };