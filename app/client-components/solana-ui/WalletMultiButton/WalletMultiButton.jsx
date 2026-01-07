"use client";
import React, { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from './WalletMultiButton.module.css'
import { useAppSolanaWallet } from "@herocoinhunter2/common-service";


// Wallet select dialog
const WalletDialog = ({ visible, onClose }) => {
  const { wallets, select } = useWallet();

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Select a Wallet</h3>
        <div className={styles.walletList}>
          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              className={styles.walletBtn}
              onClick={() => {
                select(wallet.adapter.name);
                onClose();
              }}
            >
              {wallet.adapter.icon && (
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  className={styles.walletIcon}
                />
              )}
              <span className={styles.walletName}>{wallet.adapter.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Connected wallet dialog (copy + disconnect)
const ConnectedDialog = ({ visible, onClose }) => {
  const { publicKey, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!visible || !publicKey) return null;

  const shortAddress =
    publicKey.toBase58().slice(0, 4) +
    "..." +
    publicKey.toBase58().slice(-4);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Wallet Actions</h3>
        <div className={styles.addressBox}>
          <span>{shortAddress}</span>
          <button className={styles.copyBtn} onClick={copyAddress}>
            {copied ? "✔" : "Copy"}
          </button>
        </div>
        <div className={styles.actionRow}>
          <button
            className={styles.disconnectBtn}
            onClick={() => {
              disconnect();
              onClose();
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CustomWalletDialogs() {
  const {walletDialogVisible, setWalletDialogVisible, connectedDialogVisible, setConnectedDialogVisible} = useAppSolanaWallet()

  return (
    <>
      {/* dialogs */}
      <WalletDialog
        visible={walletDialogVisible}
        onClose={() => setWalletDialogVisible(false)}
      />
      <ConnectedDialog
        visible={connectedDialogVisible}
        onClose={() => setConnectedDialogVisible(false)}
      />
    </>
  );
}
