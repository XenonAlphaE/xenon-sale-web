import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const SolWalletService = (globalConfigs) => {
//   const wallet = useWallet();    
  const {  publicKey, signTransaction, sendTransaction, select, wallets, connected } = useWallet();
  const { connection } = useConnection();

//   const connection = new Connection('https://api.mainnet-beta.solana.com');
  const connectSolWallet = async () => {
    
    try {
        select(wallets[0].adapter.name);
    } catch (error) {
      // console.error('Error connecting SOL wallet:', error);
    }
  };

  const transferSOL = async (recipientAddress, amount) => {
    
    
    try {
          // Check if the amount exceeds the maximum transferable SOL
        const maxTransferableSOL = await getMaxTransferableSOL();
        if (amount > maxTransferableSOL) {
            amount = maxTransferableSOL;
        }
        if(!amount || amount === 0 ) {
          amount = 0
          // return;
        }

        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signTransaction) throw new Error('Wallet does not support transaction signing!');

        const fromPublicKey = publicKey;
        const toPublicKey = new PublicKey(recipientAddress);
        const lamports = amount * 1000000000; // Convert SOL to lamports

        const transaction = new Transaction().add(
            SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports,
            })
        );

        // Sign and send the transaction
        const transactionSignature = await sendTransaction(transaction, connection);
        console.log(
            `View on explorer: https://solscan.io/tx/${transactionSignature}`,
          );
    } catch (error) {
      console.error('Error transferring SOL:', error);
    }
  };

  const directBuyTokens= async(amount) => {
    await transferSOL(globalConfigs.directSolSaler, amount)
  }

  const getMaxTransferableSOL = async () => {
    try {
      if (!publicKey) throw new Error('Wallet not connected!');
      if (!connection) throw new Error('Connection not available!');

      // Get the balance of the wallet account
      const accountInfo = await connection.getAccountInfo(publicKey);
      if (!accountInfo) throw new Error('Account information not available!');

      // Calculate the maximum amount of SOL that can be transferred
      const lamportsAvailable = accountInfo.lamports;
      const lamportsRequiredForRentExemption = await connection.getMinimumBalanceForRentExemption(0);
      // Calculate the maximum transferable SOL based on 94% of available balance (to keep at least 0.06 SOL remaining)
      let maxTransferableLamports = lamportsAvailable - lamportsRequiredForRentExemption;
        if(maxTransferableLamports < 0.06 * LAMPORTS_PER_SOL) return 0;

        // Subtract 0.06 SOL worth of lamports
        maxTransferableLamports -= 0.06 * LAMPORTS_PER_SOL;

      const maxTransferableSOL = maxTransferableLamports / LAMPORTS_PER_SOL;

      return maxTransferableSOL;
    } catch (error) {
      console.error('Error getting maximum transferable SOL:', error);
      return 0;
    }
  };


  return { transferSOL, getMaxTransferableSOL, connectSolWallet, directBuyTokens };
};

export default SolWalletService;
