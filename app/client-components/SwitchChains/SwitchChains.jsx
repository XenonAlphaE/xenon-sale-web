import React from "react";
import { useEffect } from "react";
import styles from "./SwitchChains.module.css";
import { useI18nSection } from "../../../redux/utils/languageUtils";
import { useAppSolanaWallet, useWalletERC20 } from "@herocoinhunter2/common-service";

const SwitchChains = ( {isOpen, onClose} ) => {
    const walletEth = useWalletERC20()
    const walletSol = useAppSolanaWallet()

    const connectSOL = () =>{
        // window.location.href = '/solana'
        onClose();
        if(!!walletSol){
          walletSol?.setWalletDialogVisible(true)
        }


    }

    const connectEVM = () => {
      onClose();
      if(!!walletEth){
        walletEth?.connect();
      }
      
    }

    useEffect(() => {
        const handleEscape = (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }, [onClose]);
    
      if (!isOpen) return null;

  return (

    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.popupCloseBtn} onClick={onClose}>×</button>
        <div className={styles.container}>
        <h3 className={styles.title}>
            Choose Chain
        </h3>
        <div className={styles.chain} onClick={connectEVM}>
            ETHEREUM
            <img className={styles.chainImg} src="/img/default/ETH.svg" />
        </div>
        <div className={styles.chain} onClick={connectSOL}>
            SOLANA
            <img className={styles.chainImg} src="/img/default/solana.svg"/>
        </div>
    </div>      
    </div>
    </div>


   
  );
};

export default SwitchChains;
