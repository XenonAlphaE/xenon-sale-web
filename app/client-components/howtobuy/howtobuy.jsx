
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import styles from './howtobuy.module.css';
import HowToBuyPromoBanner from './PromoBanner';


const howToBuyContents = [
  {
    "number": "1",
    "title": "step 1",
    "contents": [
      "Get some crypto from your preferred exchange. If you don’t yet have a wallet, consider using MetaMask.",
    ]
  },

  {
    "number": "2",
    "title": "step 2",
    "contents": [
      "With crypto in your wallet, you’re ready to participate in the $HYPER crypto presale. Click any Buy or Connect Wallet buttons on the website to start."
    ]
  },
  
  {
    
    "number": "3",
    "title": "step 3",
    "contents": [
      "Choose the amount of $HYPER you want to buy and confirm the transaction in your wallet. To stake at the same time, select the Buy and Stake option."
    ]
  },
  {
   
    "number": "4",
    "title": "step 4 (Card)",
    "contents": [
      "If paying by card, connect your mobile crypto wallet or browser extension wallet and choose Buy With Card. You’ll need this wallet to receive your tokens."
    ]
  }
]


function HowToBuyCard({ cardClass, title, contents }) {
  return (
      <div className={cardClass}>
        <div className={styles.cardNumber}></div>
        <div className={styles.cardTitle}>{title}</div>
        
        {contents?.map((content, i) => (
          <div>{content} </div>
        ))}
      </div>

  );
}


export const HowToBuy = () => {
    const sectionText = useI18nSection('howtobuy')

    const howToBuyContents = sectionText?.contents

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
        <HowToBuyPromoBanner/>

        <h1 className={styles.title}>
            {sectionText?.title}
        </h1>
        
        <div className={styles.flexRow}>
          <div className={styles.flex3}>
              <HowToBuyCard cardClass={styles.card} number={howToBuyContents?.[0].number} title={howToBuyContents?.[0].title}  contents={howToBuyContents?.[0].contents}/>
          </div>
          <div className={styles.flex3}>
              <HowToBuyCard cardClass={`${styles.card} ${styles.operationCard}`} number={howToBuyContents?.[1].number} title={howToBuyContents?.[1].title}  contents={howToBuyContents?.[1].contents}/>

          </div>
          <div className={styles.flex3}>
              <HowToBuyCard cardClass={`${styles.card} ${styles.settlementCard}`} number={howToBuyContents?.[2].number} title={howToBuyContents?.[2].title}  contents={howToBuyContents?.[2].contents}/>

          </div>
          <div className={styles.flex3}>
              <HowToBuyCard cardClass={`${styles.card} ${styles.settlementCard}`} number={howToBuyContents?.[2].number} title={howToBuyContents?.[2].title}  contents={howToBuyContents?.[2].contents}/>

          </div>

        
        
        </div>
        
        <div className={styles.buyNowContainer}>
            <button className={styles.buyNow} onClick={scrollToBuySection}>
                {sectionText?.buyNow}
            </button>
        
        
        </div>
      

    
      </div>
    </section>
  );
};