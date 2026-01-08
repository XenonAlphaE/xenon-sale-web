'use client'; // This component will run on the client side

import React, { useState, useEffect, useRef } from 'react';
import  styles from './currencyDropdown.module.css'
import { useNativeNetwork, useSetNativeNetwork } from '../../../redux/utils/nativeNetworkUtils';
import { NETWORK_OTIONS } from '../../../redux/ducks/nativeNetworkDuck';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import { useAppSolanaWallet } from '../../solanaWallet-provider';
import { useWalletERC20 } from '@herocoinhunter2/common-service';


/***
 * walletETH is needed to pass by parent component, It is not redux, If We use UseWallet seprate here.
 * That will create totally different instance with the Wallet Object in Header component (parent) 
 */
export const CurrencyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionText = useI18nSection('buyForm')

  const walletEth = useWalletERC20()

  const currentNetworkName = sectionText?.switchOption



  const toggleDropdown = () => {
    walletEth?.swicthNativeNetwork()    
  };

  const selectItemOnclick = (key) => {
    toggleDropdown()
    // console.log(walletETH.provider)
    // console.log(walletETH.currentAddress)
    walletEth.swicthNativeNetwork(key)

  }
  
  if(walletEth && walletEth?.currentAddress ){
    return(
        <div className={styles.container} >
          <button
            type="button"
            onClick={toggleDropdown}
            className={styles.dropdown}
            > {currentNetworkName}  
                {/* <img style={{marginRight: 5}} src={NETWORK_OTIONS['base'].img} width={20} height={20}/> 
                <img style={{marginRight: 5}} src={NETWORK_OTIONS['eth'].img} width={20} height={20}/>  
                <img style={{marginRight: 5}} src={NETWORK_OTIONS['bsc'].img} width={20} height={20}/>
                <img style={{marginRight: 5}} src={NETWORK_OTIONS['op'].img} width={20} height={20}/>
                <img style={{marginRight: 5}} src={NETWORK_OTIONS['arb'].img} width={20} height={20}/> */}
          </button>
        </div>
    )
  }

  return (
    <div >
    </div>
  );
};

