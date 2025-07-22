
'use client'; // This component will run on the client side

import React, { useState } from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import { BuyForm } from '../buyform/buyform';
import './howtobuy.css';
import './howtobuy.mobile.css';
import { ClaimForm } from '../claimform/claimform';
export const HowToBuy = () => {
    const sectionText = useI18nSection('howtobuy')
    const [selectedIdx, setSelectedIdx] = useState()
    const scrollToBuySection = () => {
        // Find the target section to scroll to
        let section = null;
      
        section = document.getElementById('intro');
        
        if (!section) {
          window.location = "/"
          return
        }
        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
      };
    const handleSelectItem = (idx) => {
      if(idx === selectedIdx){
        setSelectedIdx('')
      }
      else{
        setSelectedIdx(idx)
      }
    }
  return (
    <div id="howtobuy" className='howtobuy-container'>
        <h2 className='howtobuy-heading'>How To Buy WEPE Token</h2>
        <div className='howtobuy-content'>

            <div className="howtobuy-content-left column-arrage">
                
                <div className='howtobuy-token-frame'>
                    <h2 style={{color:"rgb(51, 255, 0)"}}>TOKEN ADDRESS</h2>
                    <p>0xccB365D2e11aE4D6d74715c680f56cf58bF4bF10</p>
                </div>
                <div className='howtobuy-token-frame'>
                    <h2 style={{color:"rgb(255, 0, 0)"}}>TOKEN Supply</h2>
                    <p>200,000,000,000 $WEPE</p>
                </div>
                <img className='howtobuy-img' src='/img/wepe/how_to_buy.svg' />
                <img className="arrow1"  src="/img/wepe/left-arrow-1.svg"/>
                <img className = "arrow2" src="/img/wepe/left-arrow-2.svg"/>
                <img className="arrow3"  src="/img/wepe/left-arrow-1.svg"/>

              

            </div>
            <div className="howtobuy-content-mid column-arrage">
              <div className='list-items'>

                  <div className='list-item'>
                      <div
                        className={`list-item-title  ${selectedIdx === 0 ? 'active' : ''}`}
                        onClick={() => handleSelectItem(0)}
                          style={{backgroundColor:"rgb(255, 0, 245)"}}>

                        Get Wallet
                        <div  className={`list-item-number  ${selectedIdx === 0 ? 'active' : ''}`} />
                      </div>

                      <div className={`list-item-content  ${selectedIdx === 0 ? 'active' : ''}`}>
                      WEPE Army already have wallets? 🤔 But if not, try MetaMask or Best Wallet. You can even buy $WEPE directly in ‘Upcoming Tokens’ in Best Wallet.
                      </div>
                  </div>
                  <div className='list-item'>
                      <div     className={`list-item-title  ${selectedIdx === 1 ? 'active' : ''}`}
                        onClick={() => handleSelectItem(1)} style={{backgroundColor:"rgb(125, 255, 255)"}}>

                        Fund Wallet
                        <div  className={`list-item-number  ${selectedIdx === 1 ? 'active' : ''}`} />
                      </div>

                      <div className={`list-item-content  ${selectedIdx === 1 ? 'active' : ''}`}>
                          Load ETH, BNB or USDT to your wallet to swap for $WEPE tokens. Send a little extra ETH or BNB to pay for gas fees. If that’s a hassle, just use a bank card.

                      </div>
                  </div>

                  <div className='list-item'>
                      <div 
                        className={`list-item-title  ${selectedIdx === 2 ? 'active' : ''}`}
                        onClick={() => handleSelectItem(2)}
                        style={{backgroundColor:"rgb(51, 255, 0)"}} >

                        Buy & Stake

                        <div
                        className={`list-item-number  ${selectedIdx === 2 ? 'active' : ''}`}

                        />
                      </div>

                      <div 
                          className={`list-item-content  ${selectedIdx === 2 ? 'active' : ''}`}>
                          To purchase $WEPE, connect your wallet to the site. Select payment method and amount to buy. Confirm the transaction. Stake $WEPE if you want that sweet APY!
                      </div>
                  </div>
              </div>
              <img className='howtobuy-img' src='/img/wepe/how_to_buy3.svg' />
            </div>


            <div className="howtobuy-content-right">
                <BuyForm />
                      
            </div>
        </div>
       
    </div>
  );
};