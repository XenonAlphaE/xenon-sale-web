
'use client'; // This component will run on the client side

import React from 'react';

import './staking.css';
import './staking.mobile.css';
import { StakingChart } from './stakingchart';
import { useWalletERC20 } from '../../erc20wallet-provider';
import { useState , useEffect} from 'react';
import { Footer } from '../footer/footer';
import PopupDialog from '../popup/popup';
import { BuyForm } from '../buyform/buyform';
import { StakingForm } from '../stakingform/stakeform';
export const Staking = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);


    const [isClicked, setIsClicked] = useState(false);
    const coolDownTime = 3000; // milliseconds
    useEffect(() => {
      if (isClicked) {
        const timeoutId = setTimeout(() => setIsClicked(false), coolDownTime);
        return () => clearTimeout(timeoutId);
      }
    }, [isClicked]);
    const walletETH = useWalletERC20();

    const stakeOnClick = async () => {
        setDialogOpen(true)
    }

    const withdrawOnClick = () => {
        
    }
    
    const claimOnClick = () => {
        alert("Claim is not live yet")
    }

    return (

        <div className='staking-container'>
            <PopupDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <StakingForm />
            </PopupDialog>
            <div className='staking-content'>


            <h1 className='staking-heading'>
            Stake BTCBULL For Passive Rewards
            </h1>
            <p className='staking-desc'>
                The distribution of BTCBULL token rewards will occur at a rate of {walletETH?.formatedStakeRate} BTCBULL tokens per ETH block. These rewards will be disbursed over 2 years and will be claimable from this portal.

            </p>
            <div className='staking-card-list'>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Staked Balance
                        </div>
                        <div>
                        {walletETH?.formatedStaked} ${walletETH?.tokenSymbol}
                        </div>
                        
                        <div>
                            Your stakeable
                        </div>
                        <div>
                        {walletETH?.formatedStakeable} ${walletETH?.tokenSymbol}

                        </div>
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn' onClick={stakeOnClick}>
                            BUY AND STAKE
                        </button>
                    </div>
                </div>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            % of Pool


                        </div>
                        <div>
                            {walletETH?.stakedPortion}%
                        </div>
                        <div>Total Staked</div>
                        <div>
                        {walletETH?.formatedTotalStake}  ${walletETH?.tokenSymbol}

                        </div>
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn' onClick={withdrawOnClick}>
                            WITHDRAW TOKENS
                        </button>
                    </div>
                </div>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                        Estimated Rewards

                        </div>
                        <div>
                            200% p/a
                        </div>
                        <div>
                        Rewards rate is dynamic
                        </div>
                        <div>
                        Monthly = Rewards % / 12
                        </div>
                        <div>
                        Daily = Rewards % / 365
                        </div>
                    </div>
                </div>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Current Rewards
                        </div>
                        <div>
                        {walletETH?.formatedStakeRate} Per ETH Block
                        </div>
                    </div>
                </div>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Total Rewards
                        </div>
                        <div>
                        -- ${walletETH?.tokenSymbol}
                        </div>
                      
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn' onClick={claimOnClick}>
                            CLAIM REWARDS
                        </button>
                    </div>
                </div>
            </div>

            <div className='staking-chart-container'>
                <div className='staking-chart'>

                    <StakingChart />
                    <div className='staking-chart-total'> Total Supply</div>
                </div>
                <div className='staking-chart-logo-container'>
                    <img src='/img/btcbull/logo.png' className='staking-chart-logo' />
                </div>
            </div>
        </div>
        <Footer/>

        </div>

    );
};