import React, { useState, useEffect } from "react";
import { calculateRaise, formatIntNumber, formatTokenNumber } from '../../app/client-components/services/utils';
import { useGlobalConfig } from '../../app/globalConfig-provider';



export const useSiteInfo = () => {
    const configs = useGlobalConfig()
    
    const lastestUpdated = configs.lastestUpdated
    const lastestRaise  = configs.lastestRaise
    const dailyRaise = configs.dailyRaise

    const [currentRaise, setCurrentRaise] = useState(0);
    const [nextRaise, setNextRaise] = useState(0);

    useEffect(() => {
        const { currentRaise, nextRaise } = calculateRaise(
            lastestUpdated,
            lastestRaise,
            dailyRaise
        );
        
        setCurrentRaise(currentRaise);
        setNextRaise(nextRaise);
    }, []);

    return{
        tokenSymbol: configs?.targetToken?.symbol,
        tokenPriceInUsdt: configs?.targetToken?.tokenPrice,

        currentRaise,
        nextRaise,

        formatedRaise:formatTokenNumber(currentRaise),
        formatedNextRaise:formatIntNumber(nextRaise),
    }
};

