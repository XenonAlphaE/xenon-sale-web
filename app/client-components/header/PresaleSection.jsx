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
            <img className={styles.bannerListImg} src="/img/default/twitter_new_brand_icon.png" alt="banner" />
          </div>
          <div className={styles.bannerListItem}>
            <img className={styles.bannerListImg} src="/img/default/telegram_plane_icon.png" alt="banner" />
          </div>
          
        </div>

      </div>
    

    </section>
  );
};

export default PresaleSection;
