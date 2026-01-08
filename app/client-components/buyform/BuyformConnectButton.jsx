// ProgressBar.jsx or .tsx
import React from 'react';
import styles from  './buyform.module.css'
import { useAppSolanaWallet, useWalletERC20 } from '@herocoinhunter2/common-service';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import { useToggleChainsDialog } from '../../../redux/utils/dialogUtils';

export const BuyformConnectButton = () => {
    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()
    const toggleSelectChains = useToggleChainsDialog()

    const sectionText = useI18nSection('buyForm')

    if(walletEth && walletEth?.currentAddress){
        return <></>
    }
    if(walletSol && walletSol?.connected ){
        return <></>
    }

    return (
        <div className={styles.actionButtons} >
            <button className={styles.connectBtn}   onClick={toggleSelectChains}>
                {sectionText?.connectWallet}
            </button>
        </div>
    );
};
