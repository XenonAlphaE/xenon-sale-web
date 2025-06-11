import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './tokenomics.module.css'

const infoContents = [
    {
      "number": "1",
      "title": "Treasury 25%",
      "contents": [
        "Designated token allocation for business development and community activations."
      ]
    },
  
    {
      "number": "2",
      "title": "marketing 20%",
      "contents": [
        "Viral marketing. Paid and organic media. Tier 1 geos. $HYPER is a global crypto phenomenon."
      ]
    },
    
    {
      
      "number": "3",
      "title": "Rewards 15%",
      "contents": [
        "Community rewards allocation for staking and token giveaway promotions and events."
      ]
    },
    {
     
      "number": "4",
      "title": "listings 10%",
      "contents": [
        "Designated token allocation for Bitcoin Hyper ($HYPER) token listings on various exchanges."
      ]
    },
    {
     
      "number": "4",
      "title": "Development 30%",
      "contents": [
        "The first and fastest Bitcoin Layer 2 will undergo continuous development and improvements."
      ]
    }
  ]
  
function InfoCard({ cardClass, title, contents }) {
    return (
        <div className={cardClass}>
          <div className={styles.cardNumber}></div>
          <div className={styles.cardTitle}>{title}</div>
          
          {contents.map((content, i) => (
            <div>{content} </div>
          ))}
        </div>
  
    );
  }
  
function BuyNowButton( {eventOnClick}) {
    return(
        <div className={styles.buyNowWrapper}>
            <button className={styles.buyNowBtn} onClick={eventOnClick}>Buy NOW</button>
            <p>Full breakdown of how Bitcoin Hyper² works</p>
        </div>
    )
}

  

export const Tokenomics = () => {
  const sectionText = useI18nSection('tokenomics')
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
    <section id="tokenomics" className={styles.tokenomicsContainer}>
        <h1 className={styles.title}>TOKENOMICS</h1>

        <div className={styles.mainContent}>

            <div class={`${styles.item} ${styles.item1}`}>
                <div  className={styles.cards}>
                    <InfoCard cardClass={styles.card} title={infoContents[0].title} contents={infoContents[0].contents} />
                    <InfoCard cardClass={styles.card} title={infoContents[1].title} contents={infoContents[1].contents} />
                </div>

            </div>
            <div class={`${styles.item} ${styles.item2}`}>
                <div className={styles.imgWrapper}>
                    <img src="/img/btchyper/tokenomics.gif" className={styles.imgGraphic}/>
                </div>
            </div>
            <div class={`${styles.item} ${styles.item3}`}>
                <div  className={styles.cards}>
                    <InfoCard cardClass={styles.card} title={infoContents[2].title} contents={infoContents[2].contents} />
                    <InfoCard cardClass={styles.card} title={infoContents[3].title} contents={infoContents[3].contents} />
                </div>
                <div  className={styles.cards}>

                    <InfoCard cardClass={styles.card} title={infoContents[4].title} contents={infoContents[4].contents} />
                </div>

            </div>
            <div class={`${styles.item} ${styles.item4}`}><BuyNowButton eventOnClick={scrollToBuySection} /></div>
        </div>


    </section>
  );
};
