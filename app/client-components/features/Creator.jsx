
'use client'; // This component will run on the client side

import React from 'react';
import { useI18nSection } from '../../../redux/utils/languageUtils';

import styles from './Creator.module.css';

const cardContents = [
    {
        "number": "1",
        "title": "AI Profile Creation",
        "src":"/img/subbd/creator-card-1.webp",
        "contents": [
            "Generate Your AI Profile",
        ]
    },

    {
        "number": "2",
        "title": "AI Voicenotes",
        "src":"/img/subbd/creator-card-2.webp",

        "contents": [
            "Develop custom AI voices"
        ]
    },

    {

        "number": "3",
        "title": "AI Video",
        "src":"/img/subbd/creator-card-3.webp",

        "contents": [
            "Video editor & generator"
        ]
    },
    {

        "number": "3",
        "title": "AI Livestreams",
        "src":"/img/subbd/creator-card-4.webp",

        "contents": [
            "Go live automatically"
        ]
    },
]


function CreatorCard({ title, contents, src }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardNumber}>
                <img className={styles.numberIcon} src={src}/>
            </div>
            <div className={styles.cardTitle}>{title}</div>

            {contents?.map((content, i) => (
                <div className={styles.cardContent}>{content} </div>
            ))}
        </div>

    );
}


export const Creator = () => {
    const sectionText = useI18nSection('creator')


    const scrollToBuySection = () => {
        // Find the target section to scroll to
        let section = null;

        section = document.getElementById('intro');

        if (!section) {
            window.location = "/"
            return
        }
        // Scroll to the section
        section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={styles.container} id='howtobuy'>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>
                    AI Creator <span style={{ color: '#fe3642' }}>Coming Soon</span> 
                </h1>

                <p className={styles.desc}>
                    Anyone can earn with $SUBBD. Customize and create your own AI influencer. Use advanced tools to generate images, market your content, and monetize exclusively on SUBBD.

                </p>

                <div className={styles.sectionContent}>
                    <div className={styles.leftPart}>
                        <video  className={styles.video} autoplay="true" muted="true" playsinline="true" loop="true" >
                            <source _ngcontent-ng-c1907416210="" src="/img/subbd/subbd.webm" type="video/webm"/>
                            <source _ngcontent-ng-c1907416210="" src="/img/subbd/subbd.mp4" type="video/mp4"/> Your browser does not support the video tag. 
                        </video>
                    </div>
                    <div className={styles.rightPart}>
                        <h1 className={styles.title1}>
                            <span style={{ color: '#fe3642' }}>New AI Features Loading...</span>
                        </h1>

                        <div className={styles.cardList}>
                            {cardContents.map(x => CreatorCard(x))}
                        </div>
                    </div>

                </div>



            </div>
        </section>
    );
};