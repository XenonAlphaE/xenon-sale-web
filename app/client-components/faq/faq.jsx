'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import styles from './faq.module.css';
import { AppSpinner } from '../spinner/spinner';

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
function FaqCard({ cardClass, title, contents }) {
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

export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const currentLanguage = useLanguage()
  const [selectedIdx, setSelectedIdx] = useState();

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


  const handleSelectSection = (idx) => {
    if (selectedIdx === idx) {
      setSelectedIdx("")
    } else {
      setSelectedIdx(idx)
    }
  }
  return (

    <section id="faqs" className={styles.container}>
      <h1 className={styles.title}>
        Bitcoin Hyper FAQ
      </h1>

      <div className={styles.mainContent}>
          <div className={styles.imgWrapper}>
              <img src="/img/btchyper/faq.gif" className={styles.imgGraphic}/>
          </div>

          <div  className={styles.cards}>
              <FaqCard cardClass={styles.card} title={infoContents[0].title} contents={infoContents[0].contents} />
              <FaqCard cardClass={styles.card} title={infoContents[1].title} contents={infoContents[1].contents} />
          </div>

      </div>
    </section>
  );
};
