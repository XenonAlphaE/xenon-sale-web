"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
// import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile";

import { AppSolanaProvider } from "../../solanaWallet-provider";
import CustomWalletDialogs from "./WalletMultiButton/WalletMultiButton";
import { getRandomItemFromArray } from "../services/utils";
import { useGlobalConfig } from "../../globalConfig-provider";
import { clusterApiUrl } from "@solana/web3.js";


export const SolanaProvider = ({ children }) => {
  const configs = useGlobalConfig()
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // Replace this with your provider’s RPC URL
  const endpoint = useMemo(
    () =>
      getRandomItemFromArray(configs?.solana?.RPC_APIs,clusterApiUrl(network) ),
    [network]
  );
  // inside SolanaProvider
const wallets = useMemo(() => {
    if (typeof window === "undefined") return [];

    return [
      new WalletConnectWalletAdapter({
        network,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          projectId: "51049c615eabe22a2604d0872d7d6e65",
          metadata: {
            name: "My Solana Dapp",
            description: "Dapp with QR connect",
            url: window.location.origin,
            icons: [`${window.location.origin}/img/pepenode/token.svg`],
          },
        },
      }),
    ];
  }, [network]);


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppSolanaProvider globalConfigs={configs}>
            <CustomWalletDialogs/>
            {children}
          </AppSolanaProvider>
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};