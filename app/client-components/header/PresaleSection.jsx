// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <div className={styles.topSection}>
            <img className={styles.logo} src='/img/supepe/titlelogo.gif' />
            <h2 className={styles.headline}>{sectionText?.headline}</h2>
            <img className={styles.title} src='/img/supepe/title.webp' />
            <img className={styles.line} src='/img/supepe/line.webp' />
            <img className={styles.price} src='/img/supepe/listingprice.webp' />

        </div>

        <div className={styles.bottomSection}>
            <p className={styles.description}>

              {sectionText?.description}
            </p>
            <p className={styles.description}>

              {sectionText?.description1}
            </p>
            <p className={styles.description}>

              {sectionText?.description2}
            </p>
            <p className={styles.description1}>

              {sectionText?.description3}
            </p>

          
        </div>

      </div>
    

    </section>
  );
};

export default PresaleSection;
