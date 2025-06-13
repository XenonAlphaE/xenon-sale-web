import React, { useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './footer.module.css'

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionText = useI18nSection('footer')

  

  return (
    <section id="footer" className={styles.container}>
      <div className={styles.mainContent}>
        <p className={styles.copyright}>Disclaimer</p>
        <p className={styles.copyright}>Always do your own research. Nothing here is financial advice. This is a meme coin
        </p>
        <p className={styles.copyright}>2025 bitcoin hyper All rights reserved.</p>
        <img  className={styles.avatar} src='/img/btchyper/logo-white.svg' />
      </div>
    </section>
  );
};
