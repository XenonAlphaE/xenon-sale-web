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
          <img className={styles.brandLogo}  src="/img/pepenode/logo.svg"/>
          {/* <img className={styles.textLogo}  src="/img/btcswift/bitcoin-swift-text-logo.webp"/> */}
        </a>
        <p className={styles.copyright}> {sectionText?.text1}Disclaimer  </p>
        <p className={styles.copyright}>{sectionText?.text2}Always do your own research about the best crypto to buy, best ICO, or fake 'Pepe Node' imitators. Nothing here is financial advice. This is a meme coin.</p>
        <p className={styles.copyright}> {sectionText?.text3} </p>
      </div>
    </section>
  );
};
