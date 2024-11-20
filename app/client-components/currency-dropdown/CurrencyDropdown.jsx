'use client'; // This component will run on the client side

import React, { useState, useEffect, useRef } from 'react';
import './currencyDropdown.css'
import { useNativeNetwork, useSetNativeNetwork } from '../../../redux/utils/nativeNetworkUtils';
import { NETWORK_OTIONS } from '../../../redux/ducks/nativeNetworkDuck';
import { useI18nSection } from '../../../redux/utils/languageUtils';


/***
 * walletETH is needed to pass by parent component, It is not redux, If We use UseWallet seprate here.
 * That will create totally different instance with the Wallet Object in Header component (parent) 
 */
export const CurrencyDropdown = ({ walletETH}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionText = useI18nSection('buyForm')


  const currentNetwork = useNativeNetwork()
  const currentNetworkName = currentNetwork === 'bsc' ? sectionText?.bnbOption : sectionText?.ethOption



  const toggleDropdown = () => {
    walletETH.swicthNativeNetwork()    
  };

  const selectItemOnclick = (key) => {
    toggleDropdown()
    // console.log(walletETH.provider)
    // console.log(walletETH.currentAddress)
    walletETH.swicthNativeNetwork(key)

  }
  

  return (
    <div className="curr-dropdown-container">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-100 curr-custom-dropdown">  <img style={{marginRight: 5}} src={NETWORK_OTIONS[currentNetwork].img} width={20} height={20}/> {currentNetworkName} &#9660;</button>
      {/* <div className={`curr-dropdown-content ${isOpen ? 'open' : ''}`}>
        {nerNetworkOptionKeys.map((networkKey) => (
          <div key={networkKey} className="curr-dropdown-item" onClick={() => {selectItemOnclick(networkKey)}}>
            <img src={NETWORK_OTIONS[networkKey].img} width={26} height={26} />
            <span>{NETWORK_OTIONS[networkKey].name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

