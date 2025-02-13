
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import './howtobuy.css';
import {Carousel} from '../carousel/carousel'
import { AppSpinner } from '../spinner/spinner';
export const HowToBuy = () => {
    const sectionText = useI18nSection('howtobuy')

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

  return (
    <div id="howtobuy" className='howtobuy-container'>
        <div className='howtobuy-container-overlay'> </div>
        <div className='howtobuy-content'> 
          <h3 className="howtobuy-heading">How To Buy <span style={{color:"white"}}> BTC Bull </span> </h3>

              <div className='howtobuy-card howtobuy-card1'>
                  <div className='howtobuy-card-title'>Step 1:</div>
                  <p className='howtobuy-card-content'>

                    To capitalize on BTC Bull and the Bitcoin bull run, you need a DeFi crypto wallet such as MetaMask, Trust or any. Connect it to the presale widget at the top of this page.
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card2'>
                  <div className='howtobuy-card-title'>Step 2:</div>
                  <p className='howtobuy-card-content'>

                  Have ETH or USDT to proceed. Make a deposit or buy crypto directly in Wallet to fund your $BTCBULL purchase. Make sure you have enough ETH left over to pay for gas fees.
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card3'>
                  <div className='howtobuy-card-title'>
                  Step 3:

                  </div>
                  <p className='howtobuy-card-content'>

                  Staking is available on Ethereum to increase your $BTCBULL holdings. If you choose to stake, follow the prompts on the widget. The APY is dynamic and could change over time.


                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
              <div className='howtobuy-card howtobuy-card4'>
                  <div className='howtobuy-card-title'>
                      Step 4:


                  </div>
                  <p className='howtobuy-card-content'>
                  After completing your purchase, your $BTCBULL token balance will be displayed on the buy widget. These tokens can be claimed once the BTC Bull presale has sold out or timed out.
                  </p>
                  <img className='howtobuy-card-img' src='/img/btcbull/btcbull-icon.svg'/>
              </div>
        </div>
    </div>
  );
};