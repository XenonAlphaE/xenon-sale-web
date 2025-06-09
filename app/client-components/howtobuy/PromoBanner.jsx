// components/PromoBanner.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PromoBanner.module.css';

const HowToBuyPromoBanner = () => {
    const sectionText = useI18nSection('promoBanner')
  
    return (
      <div className={styles.banner}>
        <div className={styles.imageWrapper}>
            <img src='/img/btchyper/bit-coin-slider-right.gif' alt="Mascot" className={styles.imageMascot} priority />
          </div>
        <div className={styles.content}>

          <div className={styles.textSection}>
            <h1 className={styles.title}>{sectionText?.title}</h1>
            <p className={styles.subtitle}>{sectionText?.subtitle}</p>
            <button className={styles.ctaButton}>{sectionText?.cta}</button>
          </div>
        </div>
      </div>
    );
};

export default HowToBuyPromoBanner;
