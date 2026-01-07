"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
// import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile";

import { SolanaWallet } from "@herocoinhunter2/common-service";
import { useGlobalConfig } from "../../globalConfig-provider";


export const SolanaProvider = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  // const network = WalletAdapterNetwork.Mainnet;
    const globalConfig = useGlobalConfig()

  // You can also provide a custom RPC endpoint
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // Replace this with your provider’s RPC URL
//   const endpoint = useMemo(
//     () =>
//       getRandomItemFromArray([ ...configs.solana.RPC_APIs]),
//     [network]
//   );
//   // inside SolanaProvider
// const wallets = useMemo(() => {
//     if (typeof window === "undefined") return [];

//     return [
//       new WalletConnectWalletAdapter({
//         network,
//         options: {
//           relayUrl: "wss://relay.walletconnect.com",
//           projectId: "51049c615eabe22a2604d0872d7d6e65",
//           metadata: {
//             name: "My Solana Dapp",
//             description: "Dapp with QR connect",
//             url: window.location.origin,
//             icons: [`${window.location.origin}/img/pepenode/token.svg`],
//           },
//         },
//       }),
//     ];
//   }, [network]);


  return (
    <SolanaWallet globalConfigs={globalConfig}>
            {children}
        
    </SolanaWallet>
  );
};