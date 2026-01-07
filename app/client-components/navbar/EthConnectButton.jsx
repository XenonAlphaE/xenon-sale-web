'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { truncateMiddle } from '../services/wallet-service';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";


import { useWalletERC20 } from '@herocoinhunter2/common-service';

export default function EthConnectButton({toggleMenu}) {
    const sectionText = useI18nSection("nav")
    const walletEth = useWalletERC20()

    const scrollToBuySection = async () => {
        if (!!walletEth?.currentAddress) {
            toggleMenu()
            
            walletEth?.openAcctModal();   // ✅ safe
        }
        else {
            toggleMenu()
            // toggleSelectChains()
        }
    };

  return(
    <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!walletEth?.currentAddress ? truncateMiddle(walletEth?.currentAddress) : sectionText?.buyNow}</button>
  )

}