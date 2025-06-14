
import React from 'react';
import styles from './TrustedBy.module.css';
import { useI18nSection } from '../../../redux/utils/languageUtils';

const logos = [
  { src: '/img/btchyper/feature_1.svg', alt: 'Cointelegraph' },
  { src: '/img/btchyper/feature_2.svg', alt: 'CoinMarketCap' },
  { src: '/img/btchyper/feature_3.svg', alt: 'Bitcoin.com' },
  { src: '/img/btchyper/feature_4.svg', alt: 'Cryptonews' },
  { src: '/img/btchyper/feature_5.svg', alt: 'Binance Square' },
  { src: '/img/btchyper/feature_6.svg', alt: 'Bitcoin Magazine' },
  { src: '/img/btchyper/feature_7.svg', alt: '99Bitcoins' },
];

export default function TrustedBy() {
  const sectionText = useI18nSection('trustedBy')
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h3 className={styles.title}>{sectionText?.title}</h3>
        <div className={styles.logoScrollContainer}>
            <div className={styles.logos}>
            {logos.map((logo, index) => (
                <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className={styles.logo}
                />
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
