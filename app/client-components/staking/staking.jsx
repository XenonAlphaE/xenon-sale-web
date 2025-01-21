
'use client'; // This component will run on the client side

import React from 'react';

import './staking.css';
import './staking.mobile.css';
import { StakingChart } from './stakingchart';
import { useWalletERC20 } from '../../erc20wallet-provider';
import { useState , useEffect} from 'react';
export const Staking = () => {
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
        if (!isClicked) {
            setIsClicked(true);

            if(!walletETH.currentAddress){
                walletETH?.connect()
            }
            else{
                await walletETH?.buyTokensWithRef(walletETH?.maxAmount, "")
            }
        }
    }

    const withdrawOnClick = () => {

    }
    
    const claimOnClick = () => {
        alert("Claim is not live yet")
    }

    return (

        <div className='staking-container'>

            <h1 className='staking-heading'>
                Welcome to $MIND staking

            </h1>
            <p className='staking-desc'>
                While the $MIND crypto presale is ongoing and afterwards, the distribution of staking rewards will occur at a rate of 1332 $MIND tokens per ETH block. These rewards will be disbursed over 3 years and will be claimable once claim goes live.
            </p>
            <div className='staking-card-list'>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Staked Balance
                        </div>
                        <div>
                        0 $MIND
                        </div>
                        <div>
                            Your stakeable
                        </div>
                        <div>
                        0 $FLOCK

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
                            0%
                        </div>
                        <div>Total Staked</div>
                        <div>
                            679,404,199 $MIND

                        </div>
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn' onClick={stakeOnClick}>
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
                            267% p/a
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
                        684.93 Per ETH Block
                        </div>
                    </div>
                </div>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Total Rewards
                        </div>
                        <div>
                        0 $MIND
                        </div>
                      
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn' onClick={claimOnClick}>
                            CLAIM REWARDS
                        </button>
                    </div>
                </div>
            </div>

         
            <div className='staking-chart'>

                <StakingChart />
                <div className='staking-chart-total'> Total Supply</div>
            </div>
        </div>
    );
};