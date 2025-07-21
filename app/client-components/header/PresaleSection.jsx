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
          {sectionText?.headline}
        </h1>
        <p>
          {sectionText?.description}


        </p>
  
    </div>
  );
};

export default PresaleSection;
