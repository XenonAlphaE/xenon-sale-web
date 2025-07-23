import React, {useState} from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './faq.module.css'
import { generateRandomId } from "../services/utils";


export const FAQS = () => {
  const [selectedIdx , setSelectedIdx] = useState();

  const sectionText = useI18nSection('roadmap')
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

  const handleSelectSection = (idx) => {
    if(selectedIdx === idx){
      setSelectedIdx("")
    }else{
      setSelectedIdx(idx)
    }
  }

  const cardItems = [
      {id: generateRandomId(), title:'What is BTC Swift (BTC3)?', contents:[
        "BTC Swift is a next-generation blockchain that combines the security of Bitcoin with fast, low-cost transactions and innovative decentralized applications. It features programmable Proof-of-Yield rewards, AI-powered smart contracts, and privacy-first decentralized identity."
      ]},
      {id: generateRandomId(), title:'How do I participate in the presale?', contents:[
        "Participating is simple: 1) Register with your email on our secure platform, 2) Create an order specifying the amount of BTC3 tokens you want, 3) Send crypto to the generated wallet address, 4) Tokens are credited to your account and delivered at launch."
      ]},
      {id: generateRandomId(), title:'What makes BTC Swift different from other cryptocurrencies?', contents:[

"BTC Swift offers unique features including programmable Proof-of-Yield rewards that adapt based on network activity, AI-powered smart contracts that evolve automatically, privacy-first decentralized identity with zero-knowledge cryptography, and hybrid PoW + PoS security for maximum protection."



            ]},
      {id: generateRandomId(), title:'What is the tokenomics structure?', contents:[
'Total supply is 45M tokens distributed as: 30% Presale (13.5M), 50% Mining Rewards (22.5M), 15% Liquidity Pool (6.75M), and 5% Team & Reserves (2.25M). This structure ensures long-term sustainability and community benefit.'

      ]},
      {id: generateRandomId(), title:'Is BTC Swift audited?', contents:[
'Yes, BTC Swift has been audited by both SpyWolf and SolidProof, two leading blockchain security firms. These audits ensure the security and reliability of our smart contracts and tokenomics structure.'

      ]},
      {id: generateRandomId(), title:'Who is Behind BTC Swift?', contents:[
"BTC Swift is built by a globally distributed team of blockchain, AI, and cryptography experts. Like Satoshi, the core team remains anonymous to preserve decentralization and focus on the technology. For transparency and security, select team members have completed KYC verification with trusted partners, ensuring accountability without compromising the project's values."

      ]},
      {id: generateRandomId(), title:'What is BTC3 USD-pegged stablecoin (BTC3E)?', contents:[

"As part of our ecosystem, we'll launch a BTC3 stablecoin equivalent to 1 USD to support instant payments and provide stability for users who need predictable value for transactions and commerce."

      ]},
     
  ]

  const renderRow = (item, idx) => {
          return(


            <div className={styles.card}>
                <div className={styles.cardTop} onClick={() => handleSelectSection(idx)}>
                    <div className={styles.cardTitle} > {item?.title} </div>
                    {selectedIdx===idx ? 
                      <img src='/img/btcswift/arrow-up.svg' width={33} />
                      :
                      <img src='/img/btcswift/arrow-down.svg' width={33} />
                    }

                </div>
                <div className={`${styles.cardContent}  ${selectedIdx===idx ? styles.active : ''}`}>
                      {item?.contents?.map(x => x)}
                </div>

          
            </div>
          )
  }

  return (
    <section id="faqs" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.desc}>Get answers to the most common questions about BTC Swift</p>
          

          <div className={styles.cardList}>

            {cardItems.map((item,idx)=> renderRow(item,idx))}

          </div>

          <button className={styles.buyBtn} onClick={scrollToBuySection}> Start purchase BTC Swift</button>

        </div>


    </section>
  );
};
