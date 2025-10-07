"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";

import { AppSolanaProvider } from "../../solanaWallet-provider";
import CustomWalletDialogs from "./WalletMultiButton/WalletMultiButton";
import { getRandomItemFromArray } from "../services/utils";
import { useGlobalConfig } from "../../globalConfig-provider";

export const SolanaProvider = ({ children }) => {
  const configs = useGlobalConfig();

  // 🚫 Early return BEFORE any hooks if no config
  if (!configs?.solana?.RPC_APIs?.length) return null;

  // ✅ Hooks start only after we know configs exist
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    return getRandomItemFromArray(configs.solana.RPC_APIs);
  }, [configs.solana.RPC_APIs]);

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
            <CustomWalletDialogs />
            {children}
          </AppSolanaProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
