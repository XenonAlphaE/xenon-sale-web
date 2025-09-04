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
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
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