// ProgressBar.jsx or .tsx
import React from 'react';
import styles from  './buyform.module.css'
import { useI18nSection } from '../../../redux/utils/languageUtils';
import { useToggleChainsDialog } from '../../../redux/utils/dialogUtils';
import { useSiteInfo } from '../../../redux/utils/siteInfoUtils';
import { useAppSolanaWallet, useWalletERC20 } from '@herocoinhunter2/common-service';

export const PurchaseAmounts = () => {
    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()
    const siteConfig = useSiteInfo();
    const sectionText = useI18nSection('buyForm')
    
    
    if(walletSol && walletSol.connected){
        return(
            <div>
                    <p className={styles.userPurchasedInfo}>{sectionText.boughtAmount} ${siteConfig?.tokenSymbol} = { walletSol?.formatedBought}</p>
                    <p className={styles.userPurchasedInfo}>{sectionText.stakeableAmount} ${siteConfig?.tokenSymbol} = {walletSol?.formatedStakeable}</p>
            </div>
        )
    }

    if(walletEth && walletEth?.currentAddress){
        return (

            <div>
                    <p className={styles.userPurchasedInfo}>{sectionText.boughtAmount} ${siteConfig?.tokenSymbol} = { walletEth?.formatedBought}</p>
                    <p className={styles.userPurchasedInfo}>{sectionText.stakeableAmount} ${siteConfig?.tokenSymbol} = {walletEth?.formatedStakeable}</p>
            </div>
        )    
    }


    return (
        <div>
        </div>


    );
};
