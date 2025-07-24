import React, { useState, useEffect } from 'react';
import { useLanguage, useI18nSection } from "../../../redux/utils/languageUtils";
import styles from './footer.module.css'

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionText = useI18nSection('footer')

  

  return (
    <section id="footer" className={styles.container}>
      <div className={styles.mainContent}>
        <a className={styles.appnavBrand} href='/'>
          <img className={styles.brandLogo}  src="/img/btcswift/bitcoin-swift-logo-main.webp"/>
          <img className={styles.textLogo}  src="/img/btcswift/bitcoin-swift-text-logo.webp"/>
        </a>
        <p className={styles.copyright}>The future of Bitcoin with fast, low-cost transactions and innovative decentralized applications.</p>
        <p className={styles.copyright}>© 2025 BTC Swift. All rights reserved.</p>
        <p className={styles.copyright}>Disclaimer: Not financial advice or a financial service. Always do your own research.</p>
      </div>
    </section>
  );
};
