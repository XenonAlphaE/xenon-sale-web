"use client";
import React, { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from './WalletMultiButton.module.css'


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

  if (!visible || !publicKey) return null;

  const shortAddress =
    publicKey.toBase58().slice(0, 4) +
    "..." +
    publicKey.toBase58().slice(-4);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(publicKey.toBase58());
    alert("Address copied to clipboard!");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Wallet Actions</h3>
        <div className={styles.addressBox}>
          <span>{shortAddress}</span>
          <button className={styles.copyBtn} onClick={copyAddress}>
            Copy
          </button>
        </div>
        <div  className={styles.actionRow}>
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

export default function CustomWalletButton() {
  const { publicKey, connected } = useWallet();
  const [walletDialogVisible, setWalletDialogVisible] = useState(false);
  const [connectedDialogVisible, setConnectedDialogVisible] = useState(false);

  return (
    <>
      {connected ? (
        <button onClick={() => setConnectedDialogVisible(true)}>
          {publicKey.toBase58().slice(0, 4)}...
          {publicKey.toBase58().slice(-4)}
        </button>
      ) : (
        <button onClick={() => setWalletDialogVisible(true)}>
          Connect Wallet
        </button>
      )}

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
