"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
// import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile";

import { AppSolanaProvider } from "../../solanaWallet-provider";
import CustomWalletDialogs from "./WalletMultiButton/WalletMultiButton";
import configs from '../config.main'
import { getRandomItemFromArray } from "../services/utils";


export const SolanaProvider = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // Replace this with your provider’s RPC URL
  const endpoint = useMemo(
    () =>
      getRandomItemFromArray([ ...configs.solana.RPC_APIs]),
    [network]
  );
  // inside SolanaProvider
  const wallets = useMemo(
    () => [
      new WalletConnectWalletAdapter({
        network,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          projectId: "51049c615eabe22a2604d0872d7d6e65", // get from walletconnect cloud
          metadata: {
            name: "My Solana Dapp",
            description: "Dapp with QR connect",
            url: "https://pepenodetoken.com/",
            icons: ["https://pepenodetoken.com/img/pepenode/token.svg"],

          },
        },
      }),
      // new SolanaMobileWalletAdapter({
      //   appIdentity: {
      //     name: "Solana App",
      //     uri: "https://pepenodetoken.com/",
      //     icon: "https://pepenodetoken.com/img/pepenode/token.svg",
      //   },
      //   authorizationResultCache: "session", // persist auth
      // }),
    ],
    [network]
  );

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