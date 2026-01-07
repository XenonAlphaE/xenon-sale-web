'use client'; // This component will run on the client side


import { EthWalletProvider } from '@herocoinhunter2/common-service';
import { useGlobalConfig } from './globalConfig-provider';

export const WalletProvider = ({ children }) => {
    const globalConfig = useGlobalConfig()

      
    return (

        <EthWalletProvider globalConfigs={globalConfig}>
            {children}
        </EthWalletProvider>
    
    );
  };