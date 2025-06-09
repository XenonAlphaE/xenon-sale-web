import React from 'react';
import styles from './about.module.css';
import { useIsMobile } from '../../../redux/utils/mobileUtils';

const aboutContents = [
  {
    "number": "1",
    "title": "BRIDGE",
    "contents": [
      "User deposits BTC to a designated Bitcoin address monitored by Bitcoin Hyper's Canonical Bridge.",
      "The Bitcoin Relay Program, an SVM smart contract, verifies Bitcoin block headers and transaction proofs.",
      "Upon successful verification, an equivalent amount of BTC is minted on Bitcoin Hyper's Layer 2 in a trustless manner."
    ]
  },

  {
    "number": "2",
    "title": "L2 Operation",
    "contents": [
      "Users can send and receive BTC on Bitcoin Hyper's Layer 2 with near-instant finality.",
      "Supports complex DeFi operations, like staking and decentralized exchanges.",
      "Leverages Solana's Virtual Machine (SVM) for high throughput and scalability"
    ]
  },
  
  {
    
    "number": "3",
    "title": "Settlement & Security",
    "contents": [
      "Bitcoin Hyper batches and compresses Layer 2 transactions.",
      "Utilizes zero-knowledge (ZK) proofs to ensure transaction validity.",
      "The state of Layer 2 is periodically committed to Bitcoin's Layer 1, maintaining synchronization and security."
    ]
  },
  {
   
    "number": "4",
    "title": "Withdrawal to L1",
    "contents": [
      "Users initiate a withdrawal request on Bitcoin Hyper's Layer 2.",
      "The system verifies the Layer 2 state and generates a proof for the canonical bridge.",
      "Upon validation, the corresponding BTC is released back to the user's Bitcoin address on Layer 1."
    ]
  }
]

const frameworks = [
  { title: 'Speed', image: '/img/btchyper/lightning.png', name: 'lightning network' },
  { title: 'Optimistic Rollups', image: '/img/btchyper/optimism.png', name: 'OPTIMISM' },
  { title: 'ZK-Rollups', image: '/img/btchyper/zkrollups.png', name: 'zkROLLUPS' },
  { title: 'Sidechains', image: '/img/btchyper/rootstock.png', name: 'Rootstock' },
  { title: 'Scalability', image: '/img/btchyper/bitcoin-hyper.png', name: 'BITCOIN HYPER²' },
];

function FrameworkCard () {

  return (
    <div className={styles.frameworkContainer}>
    <h2 className={styles.frameworkHeading}>LAYER 2 FRAMEWORKS POWERING <span className={styles.highlight}>SCALABILITY</span></h2>
    <div className={styles.frameworks}>
      {frameworks.map((fw, idx) => (
        <div key={idx} className={styles.frameworkItem}>
          <div className={styles.imageWrapper}>
            <img src={fw.image} alt={fw.name} className={styles.image} />
          </div>
          <div className={styles.label}>{fw.title}</div>
        </div>
      ))}
    </div>
  </div>  

  )
}

function AboutCard({ cardClass, number, title, contents }) {
  return (
      <div className={cardClass}>
        <div className={styles.cardNumber}>{number}</div>
        <div className={styles.cardTitle}>{title}</div>
        <ul className={styles.cardContent}>
            {contents.map((content, i) => (
              <li key={i}>{content}</li>
            ))}
        </ul>
      </div>

  );
}


const About =() => {
  const isMobile = useIsMobile()
  return (
    <section  className={styles.container} id='about'>
      <div className={styles.mainContent}>

        <h1 className={styles.title}>BITCOIN LAYER 2</h1>
        
        <div className={styles.flexRow}>
          <div className={styles.flex3}>
              <AboutCard cardClass={styles.card} number={aboutContents[0].number} title={aboutContents[0].title}  contents={aboutContents[0].contents}/>
          </div>
          <div className={styles.stepConnect}>
              <img src='/img/btchyper/ani-arrow.svg' />
          </div>
          <div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.operationCard}`} number={aboutContents[1].number} title={aboutContents[1].title}  contents={aboutContents[1].contents}/>

          </div>
          <div className={styles.stepConnect}>            
            <img src='/img/btchyper/ani-arrow.svg' />
          </div>
          <div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.settlementCard}`} number={aboutContents[2].number} title={aboutContents[2].title}  contents={aboutContents[2].contents}/>

          </div>

          {isMobile &&<div className={styles.stepConnect}>            
            <img src='/img/btchyper/ani-arrow.svg' />
          </div>}
        
          
          {isMobile &&<div className={styles.flex3}>
              <AboutCard cardClass={`${styles.card} ${styles.withdrawCard}`} number={aboutContents[3].number} title={aboutContents[3].title}  contents={aboutContents[3].contents}/>

          </div>}
        </div>

        {!isMobile &&<div className={styles.flexRow}>
          <div className={styles.flex8}> </div>
          <div className={`${styles.flex3} ${styles.stepConnect}`}>
              <img style={{transform:'rotate(90deg)'}} src='/img/btchyper/ani-arrow.svg' />



          </div>
        </div>}

        {!isMobile &&<div className={styles.flexRow}>
          <div className={styles.flex8}>
              <FrameworkCard />
          </div>
          <div className={styles.flex3}>
                <AboutCard cardClass={`${styles.card} ${styles.withdrawCard}`} number={aboutContents[3].number} title={aboutContents[3].title}  contents={aboutContents[3].contents}/>

          </div>
        </div>
        }

      </div>
    </section>

  );
};
export default About;
