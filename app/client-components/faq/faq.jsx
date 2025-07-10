'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";

import styles from './faq.module.css';


function FaqCard({ cardClass, title, contents }) {
  return (
    <div className={cardClass}>
      <div className={styles.cardNumber}></div>
      <div className={styles.cardTitle}>{title}</div>

      <ul className={styles.cardContent}>
        {contents?.map((content, i) => (
          <li key={i}>
            <strong>{content.label}</strong> {content.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const FAQ = () => {
  const sectionText = useI18nSection('faqs')
  const infoContents = sectionText?.contents
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
        {sectionText?.title}
      </h1>

      <div className={styles.mainContent}>
          <div className={styles.imgWrapper}>
              <img src="/img/btchyper/faq.gif" className={styles.imgGraphic}/>
          </div>

          <div  className={styles.cards}>
              <FaqCard cardClass={styles.card} title={infoContents?.[0].title} contents={infoContents?.[0].contents} />
              <FaqCard cardClass={styles.card} title={infoContents?.[1].title} contents={infoContents?.[1].contents} />
              <FaqCard cardClass={styles.card} title={infoContents?.[2].title} contents={infoContents?.[2].contents} />
              <FaqCard cardClass={styles.card} title={infoContents?.[3].title} contents={infoContents?.[3].contents} />
              <FaqCard cardClass={styles.card} title={infoContents?.[4].title} contents={infoContents?.[4].contents} />
          </div>

      </div>
    </section>
  );
};
