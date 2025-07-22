import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';
import { useI18nSection } from '../../../redux/utils/languageUtils';
import AutoScrollCarousel from '../carousal/AutoScrollCarousel';
import { generateRandomId } from '../services/utils';


const About =() => {
  const isMobile = useIsMobile()
  const sectionText = useI18nSection('about')
  console.log(JSON.stringify (sectionText))
  const aboutContents = sectionText?.contents

  const scrollToBuySection = () => {
    // Find the target section to scroll to
    let section = null;

    section = document.getElementById('intro');

    if (!section) {
      window.location = `/${currentLanguage}`
      return
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });
  };


  const cardItems = [
    {id: generateRandomId(), img:'/img/btcswift/about1.svg', title:'Programmable Proof-Of-Yield Rewards', content:'Dynamic rewards that adapt based on network activity and environmental impact'},
    {id: generateRandomId(), img:'/img/btcswift/about2.svg', title:'AI-Powered Smart Contracts', content:'Next-gen contracts that evolve and optimize automatically'},
    {id: generateRandomId(), img:'/img/btcswift/about3.svg', title:'Privacy-First Decentralized Identity', content:'Zero-knowledge cryptography for compliance without data exposure'},
    {id: generateRandomId(), img:'/img/btcswift/about4.svg', title:'Hybrid PoW + PoS Security', content:'Maximum security with long-term sustainability'},
    {id: generateRandomId(), img:'/img/btcswift/about5.svg', title:'Global Compliance Ready', content:'Built for regulatory environments worldwide'},
    {id: generateRandomId(), img:'/img/btcswift/about6.svg', title:'USD-Pegged Stablecoin', content:'Stable digital currency anchored to USD value'},
  ]
  const renderCardItem = (item) =>{
    
    return <div key={item?.id} className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardImgWrapper}>

                        <img className={styles.cardImg} src={item?.img}/>
                    </div>
                    <h3 className={styles.cardTitle} > {item?.title} </h3>
                </div>
                <div className={styles.cardBottom}>
                  <p className={styles.cardContent}>{item?.content}</p>
                </div>

            </div>

  }
  return (
    <section  className={styles.container} id='about'>
      <div className={styles.mainContent}>  
        <h1 className={styles.title}>Revolutionary Blockchain Technology</h1>
        <p className={styles.desc}>Experience the next generation of blockchain innovation with cutting-edge features designed for the future</p>
        
        <div className={styles.cardList }>
            {cardItems.map(x=> renderCardItem(x))}
        </div>

        <button className={styles.buyBtn} onClick={scrollToBuySection}> Buy More BTC3 now</button>
      </div>
    </section>

  );
};
export default About;
