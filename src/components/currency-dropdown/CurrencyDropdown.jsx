import React, { useState, useEffect, useRef } from 'react';
import './currencyDropdown.css'
import { useNativeNetwork, useSetNativeNetwork } from '../../utils/nativeNetworkUtils';
import { NETWORK_OTIONS } from '../../ducks/nativeNetworkDuck';
import { useI18nSection } from '../../utils/languageUtils';


/***
 * walletETH is needed to pass by parent component, It is not redux, If We use UseWallet seprate here.
 * That will create totally different instance with the Wallet Object in Header component (parent) 
 */
const CurrencyDropdown = ({ title, items , walletETH}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionText = useI18nSection('buyForm')


  const currentNetwork = useNativeNetwork()
  const nerNetworkOptionKeys = Object.keys(NETWORK_OTIONS).filter(key => key !== currentNetwork)
  const currentNetworkName = currentNetwork === 'bsc' ? sectionText?.bnbOption : sectionText?.ethOption



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItemOnclick = (key) => {
    toggleDropdown()
    console.log(walletETH.provider)
    console.log(walletETH.currentAddress)
    walletETH.swicthNativeNetwork(key)

  }
  

  return (
    <div className="curr-dropdown-container">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-100 curr-custom-dropdown">  <img style={{marginRight: 5}} src={NETWORK_OTIONS[currentNetwork].img} width={26} height={26}/> {currentNetworkName} <img style={{marginLeft: 5}} src='/img/wienerdog/angle-down.svg ' width={12} height={12}/></button>
      <div className={`curr-dropdown-content ${isOpen ? 'open' : ''}`}>
        {nerNetworkOptionKeys.map((networkKey) => (
          <div key={networkKey} className="curr-dropdown-item" onClick={() => {selectItemOnclick(networkKey)}}>
            <img src={NETWORK_OTIONS[networkKey].img} width={26} height={26} />
            <span>{NETWORK_OTIONS[networkKey].name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyDropdown;
