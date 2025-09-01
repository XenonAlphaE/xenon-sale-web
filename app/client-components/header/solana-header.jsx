'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import  styles from './header.module.css'
import PresaleSection from "./PresaleSection";
import { SolanaBuyForm } from "../buyform/solana-buyform";
export const SolanaHeader = () => {
  const sectionText = useI18nSection('header')

  return (
    <section id="intro"  className={styles.container}>
      <div className={styles.mainContent}> 
        <div className={styles.leftPart}>
            <PresaleSection />  
        </div> 
        <div className={styles.rightPart}>
            <SolanaBuyForm/>  
        </div> 

      </div>

    </section>
    // </div>
  );
};
