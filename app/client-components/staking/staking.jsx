
'use client'; // This component will run on the client side

import React from 'react';

import './staking.css';
import './staking.mobile.css';
import { StakingChart } from './stakingchart';

export const Staking = () => {



    return (

        <div className='staking-container'>

            <h1 className='staking-heading'>
                Welcome to $FLOCK Staking
            </h1>
            <p className='staking-desc'>
                The distribution of $FLOCK token rewards will occur at a rate of 684.93 $FLOCK tokens per ETH block. These rewards will be disbursed over 2 years and will be claimable once claim goes live.
            </p>
            <div className='staking-card-list'>
                <div className='staking-card'>
                    <div className='staking-card-top'>
                        <div>
                            Staked Balance
                        </div>
                        <div>
                        0 $FLOCK
                        </div>
                        <div>
                            Your stakeable
                        </div>
                        <div>
                        0 $FLOCK

                        </div>
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn'>
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
                            673,404,199 $FLOCK

                        </div>
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn'>
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
                        0 $FLOCK
                        </div>
                      
                    </div>
                    <div className='staking-card-bottom'>
                        <button className='staking-connect-btn'>
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