// components/PresaleSection.jsx
import { useI18nSection } from '../../../redux/utils/languageUtils';
import styles from './PresaleSection.module.css';

const PresaleSection = () => {
    const sectionText = useI18nSection('header')
  
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h2 className={styles.headline}>{sectionText?.headline}</h2>
        <h3 className={styles.subheadline}>
            {sectionText?.subheadline}
        </h3>

        <p className={styles.description}>
            {sectionText?.description?.line1}<br />
            {sectionText?.description?.line2}{' '}
            <strong>
              {sectionText?.description?.highlight?.join('. ')}.
            </strong><br />
            {sectionText?.description?.line3}
        </p>

        <p className={styles.tagline}>
          <strong>{sectionText?.tagline}</strong>
          <span className={styles.underline}></span>
        </p>

        <div className={styles.audit}>
          <span className={styles.auditText}>{sectionText?.audit?.label}</span>
          <img src={'/img/btchyper/coinsult.svg'} alt="Coinsult" width={100} height={28} />
        </div>

        <div className={styles.bullets}>
            {sectionText?.bullets?.map(x=>{
              return <div className={styles.bullet}>{x}</div>
            })}
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.videoContainer}>
            <video className={styles.videoPlayer} controls poster='/img/token6900/video-thumbnail.png'>
              <source src="/img/token6900/banner-vdo.mp4" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
        </div>
        <div className={styles.bannerList}>
          <img className={styles.bannerListItem} src="/img/token6900/banner-red.png" alt="banner" />
          <img className={styles.bannerListItem} src="/img/token6900/banner-green.png" alt="banner" />
          <img className={styles.bannerListItem} src="/img/token6900/banner-blue.png" alt="banner" />
        </div>
      </div>

    </section>
  );
};

export default PresaleSection;
