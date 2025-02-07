import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createToken, fetchTokens } from '../thunks/coinThunks';

export const useCreateToken = () => {
    const dispatch = useDispatch();
    return (formData) => {
        dispatch(createToken(formData));
    }
}



export const useListCoin = () => {
    const dispatch = useDispatch();
    const {loading, coins} = useSelector(state => state.coin)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if(token){
            dispatch(fetchTokens());
        }
    }, [token])
    return {coins, loading};
}