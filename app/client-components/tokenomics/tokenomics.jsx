import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './tokenomics.module.css'
import { generateRandomId } from "../services/utils";


export const Tokenomics = () => {
  
  const sectionText = useI18nSection('tokenomics')
  const cardItems = [
    {id: generateRandomId(),title: 'Economics & Treasury 35%', content:'Designated token allocation for business development and community activations.' },
    {id: generateRandomId(),title: 'Infrastructure 15%', content:'Viral marketing. paid and organic media. Tier 1 Geos. $PEPENODE is a global crypto phenomenon.' },
    {id: generateRandomId(),title: 'NODE Rewards 7.5%', content:'Community rewards allocation for staking and token giveaway promotions and events.' },
    {id: generateRandomId(),title: 'Growth & listings 7.5%', content:'Designated token allocation for PEPENODE ($PEPENODE) token listings on various exchanges.' },
    {id: generateRandomId(),title: 'Protocol Development 35%', content:'The first and fastest Mine-To-Earn will undergo continuous development and improvements.' },
  ]
  const renderCardItem = (item) =>{
      
      return <div key={item?.id} className={styles.card}>
                  <div className={styles.cardTop}>
                      <h3 className={styles.cardTitle} > {item?.title} </h3>
                  </div>
                  <div className={styles.cardBottom}>
                    <p className={styles.cardContent}>{item?.content}</p>
                  </div>

              </div>

    }

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
    <section id="tokenomics" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>Tokenomics</h1>
          <p className={styles.desc}>Earn Bonuses in Meme Coins — Airdrops For Top Miners in $PEPE and $FARTCOIN</p>
          

          <div className={styles.infoContainer}>


            <div className={styles.cardList }>
                {cardItems.map(x=> renderCardItem(x))}
            </div>



          </div>
          <div className={styles.buyNowContainer}>
            <button className={styles.buynow} onClick={scrollToBuySection}>
                {sectionText?.buyNow} Buy Presale Now
            </button>
          </div>
        </div>


    </section>
  );
};
