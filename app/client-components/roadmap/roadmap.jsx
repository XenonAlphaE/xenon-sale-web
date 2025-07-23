import React from "react";
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './roadmap.module.css'
import { generateRandomId } from "../services/utils";


export const Roadmap = () => {

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


  const cardItems = [
      {id: generateRandomId(), circleColor:'rgb(247, 147, 26)', img:'/img/btcswift/roadmap1.svg', title:'Programmable Proof-Of-Yield Rewards', subTitle:'Q3 – Q4 2025', contents:[
        "Start BTC Swift presale"
        ,"Distribute mining rewards at the end of each presale stage"
        ,"Team scaling and onboarding of strategic advisors"
        ,"Global community growth and engagement efforts"
        ,"Secure agreements with exchange platforms"
        ,"Complete presale and initiate launch on the Solana network"
      ]},
      {id: generateRandomId(), circleColor:'rgb(255, 107, 107)', img:'/img/btcswift/roadmap2.svg', title:'AI Smart Contract Engine', subTitle:'Q1 2026', contents:[
        'WASM-compatible AI agent contracts for modular on-chain automation'
        ,'AI oracle aggregation layer pulling structured and unstructured data (Web2 + Web3)'
        ,'Deployment of reinforcement learning agents for adaptive contract behavior'
        ,'On-chain AI training sandbox (Alpha) for supervised/unsupervised learning models'
        ,'Real-time AI model monitoring dashboard with transparency and audit tools'
        ,'Integration with decentralized compute networks (e.g., Akash, Gensyn) for scalable inference'

      ]},
      {id: generateRandomId(), circleColor:'rgb(255, 138, 128)',  img:'/img/btcswift/roadmap3.svg', title:'Privacy Infrastructure', subTitle:'Q1 – Q2 2026', contents:[
        'zk-SNARK–based shielded ledger rollout supporting private transactions and balances'
        ,'Support for stealth addresses and confidential asset transfers'
        ,'Integration of Decentralized Identity (DID) registry with cross-chain compatibility'
        ,'zkLogin module for private Web3 authentication tied to verifiable credentials'
        ,'Zero-knowledge audit trails for compliance with selective disclosure'
        ,'Privacy-preserving DeFi module (Beta) for lending, swaps, and vaults'
        ,'Launch of Privacy SDK to allow third-party devs to integrate shielded features'
      ]},
      {id: generateRandomId(), circleColor:'rgb(255, 95, 143)', img:'/img/btcswift/roadmap4.svg', title:'Full Governance Rollout', subTitle:'Q3 2026', contents:[
        'Quadratic Voting DAO system with anti-Sybil resistance and stake weighting'
        ,'AI-powered risk evaluation engine analyzing protocol, economic, and behavioral risk'
        ,'Emergency Council activation framework, triggered by on-chain risk heuristics'
        ,'DAO Proposal Prediction Model: AI agent to simulate proposal outcomes pre-vote'
        ,'Community-curated policy modules (e.g., treasury caps, inflation rates)'
        ,'On-chain governance simulator for modeling decisions before enactment'
        ,'Launch of multi-tier governance roles (e.g., delegates, stewards, guardians)'
      ]},
      {id: generateRandomId(), circleColor:'rgb(233, 30, 99)', img:'/img/btcswift/roadmap5.svg', title:'Institutional Compliance', subTitle:'Q4 2026', contents:[
        'MPC-based regulatory interface enabling audits without exposing private data'
        ,'Real-time compliance sandbox for testing regulated smart contracts'
        ,'Interoperable DID framework with EU eIDAS, US NIST, and APAC standards'
        ,'Launch of hybrid PoW–PoS consensus with dynamic validator rotation'
        ,'BTC3 Blockchain genesis launch, tailored for enterprise-grade finance and settlement'
        ,'1:1 trustless bridge from Solana to BTC3 with auditability and slashing for bad relayers'
        ,'Release of BTC3 USD-pegged Stablecoin (BTC3-USD) to support real-time payments and remittances'
        ,'Integration with payment gateways (e.g., POS terminals, crypto cards) for retail adoption'
        ,'Liquidity mining program for BTC3 stable assets to bootstrap ecosystem velocity'
        ,'Institutional node onboarding program for banks, fintechs, and auditors'

      ]},
  ]

  const renderRow = (item, idx) => {
          return(

        <div key={item?.id} className={ idx %2 === 0 ? styles.leftPart : styles.rightPart}>


            <div className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardCircle} style={{backgroundColor:item?.circleColor}}>
                      <img src={item?.img} className={styles.cardImg} alt="image" />
                      </div>
                    <div > 
                      <div className={styles.cardSubtitle} style={{color:item?.circleColor}}> {item?.subTitle} </div>
                      <h4 className={styles.cardTitle}>  {item?.title}</h4>

                    </div>
                </div>
                <div >
                  <ul className={styles.cardContent}>
                      {item?.contents?.map(x => <li>{x}</li>)}
                  </ul>
                </div>

            </div>
          
      </div>
          )
  }

  return (
    <section id="roadmap" className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>ROADMAP</h1>
          <p className={styles.desc}>BTC Swift Roadmap: Strategic Timeline for Next-Generation Blockchain Development</p>
          

          <div className={styles.cardList}>

            {cardItems.map((item,idx)=> renderRow(item,idx))}

          </div>
        </div>


    </section>
  );
};
