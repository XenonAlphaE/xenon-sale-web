'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { truncateMiddle } from '../services/wallet-service';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { useWalletERC20 } from '../../erc20wallet-provider';
import { useAppSolanaWallet } from '../../solanaWallet-provider';
export default function SolanaConnectButton({toggleMenu}) {
    const sectionText = useI18nSection("nav")

    const walletSol = useAppSolanaWallet()
    
    
    const scrollToBuySection = async () => {
        if (!!walletSol.connected) {
            toggleMenu()
            walletSol?.setConnectedDialogVisible(true)

        }
        else {
            toggleMenu()
            walletSol?.setWalletDialogVisible(true)
        }
    };

  return(
    <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!walletSol?.address ? truncateMiddle(walletSol?.address) : sectionText?.buyNow}</button>
  )

}