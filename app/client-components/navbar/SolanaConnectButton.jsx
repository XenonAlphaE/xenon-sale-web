'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { truncateMiddle } from '../services/wallet-service';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { useToggleChainsDialog } from '../../../redux/utils/dialogUtils';
import { useAppSolanaWallet } from '@herocoinhunter2/common-service';
export default function SolanaConnectButton({toggleMenu}) {
    const sectionText = useI18nSection("nav")

    const walletSol = useAppSolanaWallet()
    const toggleSelectChains = useToggleChainsDialog()
    
    
    const scrollToBuySection = async () => {
        if (!!walletSol.connected) {
            toggleMenu()
            walletSol?.setConnectedDialogVisible(true)
        }
        else {
            toggleMenu()
            // toggleSelectChains?.()
        }
    };
  return(
    <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!walletSol?.currentAddress ? truncateMiddle(walletSol?.currentAddress) : sectionText?.buyNow}</button>
  )

}