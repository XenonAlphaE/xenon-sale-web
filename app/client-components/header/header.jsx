'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import  styles from './header.module.css'
import PresaleSection from "./PresaleSection";
export const Header = () => {
  const sectionText = useI18nSection('header')

  return (
    <section id="intro"  className={styles.container}>
      <div className={styles.barcodeContainer}>
        <img  className={styles.barcode} src="/img/token6900/bar-code.svg"/>
      </div>
      <PresaleSection></PresaleSection>
    </section>
    // </div>
  );
};
