'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { truncateMiddle } from '../services/wallet-service';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import { useToggleChainsDialog } from '../../../redux/utils/dialogUtils';
import { useAccount } from 'wagmi'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import SolanaConnectButton from './SolanaConnectButton';
import EthConnectButton from './EthConnectButton';
import { useAppSolanaWallet, useWalletERC20 } from '@herocoinhunter2/common-service';

export default function NavbarConnectButton({toggleMenu}) {
    const sectionText = useI18nSection("nav")

    const toggleSelectChains = useToggleChainsDialog()


    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()


    
    const scrollToBuySection = async () => {
            toggleMenu()
            toggleSelectChains?.()
    };

    if(walletSol&&walletSol?.connected){
        return <SolanaConnectButton toggleMenu={toggleMenu} />
    }

    if(walletEth && walletEth?.currentAddress){
        return <EthConnectButton toggleMenu={toggleMenu}/>
    }

    return(
        <button onClick={scrollToBuySection} className={styles.appnavLogin} >{sectionText?.buyNow}</button>
    )

}