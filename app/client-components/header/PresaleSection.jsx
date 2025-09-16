// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h2 className={styles.headline}>{sectionText?.headline}</h2>
        <p className={styles.description}>

          {sectionText?.description}
        </p>
      
        <div className={styles.bannerList}>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/subbd/verified.svg" alt="banner" />
            <span> {sectionText?.tag} </span> 
          </div>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/subbd/verified.svg" alt="banner" />
            <span> {sectionText?.tag1} </span> 
          </div>
          
        </div>

      </div>
    

    </section>
  );
};

export default PresaleSection;
