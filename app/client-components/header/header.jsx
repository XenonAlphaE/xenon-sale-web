'use client'; // This component will run on the client side

import React, {  } from "react";
import { useI18nSection } from "../../../redux/utils/languageUtils";

import  styles from './header.module.css'
import PresaleSection from "./PresaleSection";
import { BuyForm } from "../buyform/buyform";
export const Header = () => {
  const sectionText = useI18nSection('header')

  return (
    <section id="intro"  className={styles.container}>
      <PresaleSection></PresaleSection>
      <BuyForm/>
    </section>
    // </div>
  );
};
