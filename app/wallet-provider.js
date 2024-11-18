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

import { ConnectButton } from '@rainbow-me/rainbowkit';


const config = getDefaultConfig({
    appName: 'RainbowKit App',
    projectId: 'f4fcaa8162f29cf1ca29a266f69ae98a',
    chains: [mainnet, bsc],
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