
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import styles from './howtobuy.module.css';
import HowToBuyPromoBanner from './PromoBanner';
import { step } from 'viem/chains';


const howToBuyContents = [
  {
    "number": "1",
    "title": "Buy With Crypto",
    "contents": [
      "Connect your wallet and swap ETH, BNB, USDT, or USDC to secure your allocation of $SUBBD tokens. Save a little ETH or BNB for gas fees to complete your transaction smoothly.",
    ]
  },

  {
    "number": "2",
    "title": "Buy With Other Network",
    "contents": [
      "Buy the $SUBBD token crypto presale directly with your bank card in just a few clicks. Connect a crypto wallet such as Trust Wallet to proceed and claim your tokens once the presale ends."
    ]
  },
  
  {
    
    "number": "3",
    "title": "Stake Your $SUBBD",
    "contents": [
      "Stake $SUBBD tokens straight away for 20% APY and receive exclusive benefits when the platform is live. Staked tokens can be withdrawn 7 days after presale claiming goes live."
    ]
  }
]


function HowToBuyCard({ title, contents, number }) {
  return (
      <div className={styles.card}>
        <div className={styles.cardNumber}>{number}</div>
        <div className={styles.cardTitle}>{title}</div>
        
        {contents?.map((content, i) => (
          <div className={styles.cardContent}>{content} </div>
        ))}
      </div>

  );
}


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
    <section  className={styles.container} id='howtobuy'>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>
How To Buy
        </h1>
        
        <h1 className={styles.title1}>
<span style={{color:'#fe3642'}}>$</span>SUBBD Token Crypto Presale
        </h1>

        <p className={styles.desc}>
          Buy the $SUBBD token crypto presale and stake to enjoy premium features like subscription discounts, exclusive content, and XP multipliers. Unlock the full potential of AI-powered content!
        </p>
    

        <div className={styles.cardList }>
            {howToBuyContents.map(x=> HowToBuyCard(x))}
        </div>


        <div className={styles.buyNowContainer}>
              <button className={styles.buynow} onClick={scrollToBuySection}>Buy $SUBBD Now</button>

        
        
        </div>
      

    
      </div>
    </section>
  );
};