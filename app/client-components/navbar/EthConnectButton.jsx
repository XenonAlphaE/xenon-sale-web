'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { truncateMiddle } from '../services/wallet-service';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { useWalletERC20 } from '../../erc20wallet-provider';
export default function EthConnectButton({toggleMenu}) {
    const sectionText = useI18nSection("nav")
    const currAccount = useAccount()
    const walletEth = useWalletERC20()
    const { openAccountModal } = useAccountModal();
    
    const scrollToBuySection = async () => {
        if (!!currAccount.address) {
            toggleMenu()
            openAccountModal();
        }
        else {
            toggleMenu()
            walletEth?.connect()
        }
    };

  return(
    <button onClick={scrollToBuySection} className={styles.appnavLogin} >{!!currAccount?.address ? truncateMiddle(currAccount?.address) : sectionText?.buyNow}</button>
  )

}