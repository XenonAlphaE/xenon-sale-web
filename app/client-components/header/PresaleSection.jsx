// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <div className={styles.container}>
          <img className={styles.brandLogo}  src="/img/btcswift/bitcoin-swift-logo-main.webp"/>
          <img className={styles.textLogo}  src="/img/btcswift/bitcoin-swift-text-logo.webp"/>
        <h1 className={styles.headline}>
          Bitcoin Swift (BTC3) AI-Powered Blockchain with Proof of Yield Mining
        </h1>
        <p>
          Bitcoin Swift: AI-Powered Blockchain for Secure, Scalable, and Private DeFi


        </p>
  
    </div>
  );
};

export default PresaleSection;
