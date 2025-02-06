import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, getNonce, fetchUser } from '../thunks/authThunks';
import { logout } from "../ducks/authDucks";
import { useAccount } from 'wagmi'


export const useAuth = (walletEth) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const profile = useSelector((state) => state.auth.profile);

    const currAccount = useAccount()

    useEffect(() => {
        // 🔹 New function: Get nonce & login in one step
        const loginWithWallet = async () => {       
            try {
                // ✅ Step 1: Fetch nonce directly (no Redux needed)
                const response = await getNonce(walletEth.currentAddress)
        
                if (!response.data?.nonce) throw new Error("Nonce not received");
        
                // ✅ Step 2: Sign nonce
                const signedMessage = await walletEth.signNonce(response.data.nonce);
                if (!signedMessage) throw new Error("Signing failed");
        
                // ✅ Step 3: Login with signed message
                dispatch(loginUser(signedMessage, walletEth.currentAddress));
            } catch (error) {
                console.error("Login failed:", error.message);
            }
        }
        
        if(!token && walletEth?.currentAddress){
            loginWithWallet()
        }

    }, [walletEth?.currentAddress]);

    useEffect(() => {
        if (!currAccount.isConnected && token) {
            console.log("Wallet disconnected!");
            dispatch(logout());
        }
    }, [currAccount.isConnected]);
    
    useEffect(() => {
        if (token) {
            dispatch(fetchUser())
        }
    }, [token]);


    return { token, isLoading, profile};
};


