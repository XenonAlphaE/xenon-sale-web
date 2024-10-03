import React, { useState, useEffect } from 'react';
import "./affForm.css";
import configs from '../../config.main.json';

import { useI18nSection } from "../../utils/languageUtils";
import { useNativeNetwork, useSetNativeNetwork } from '../../utils/nativeNetworkUtils';
import { useWalletETH } from '../../services/wallet-service1';
import { customHash, shortenText } from '../../services/utils';
import Toast from '../toast/Toast';
import Web3 from 'web3';
import { getUserRefInfo } from '../../services/ref-service';

export const AffForm = () => {
    const sectionText = useI18nSection('aff')

    const nativeNetwork = useNativeNetwork()

    const walletEth = useWalletETH(nativeNetwork, configs)

    const [ethRefURL, setEthRefURL] = useState();

    const [ethRefInfo , setEthRefInfo] = useState();
    const [bscRefInfo , setBscRefInfo] = useState();

    const [refString, setRefString] = useState();
    const [refStringHashed, setRefStringHashed] = useState();

    const [lastReload, setLastReload] = useState()



    useEffect( () => {

        const getRefData = async () => {
            
            // const refStr = customHash('0x2DC65f606b73f04c1D9C8a40f631F992C3b10599')
            const refStr = customHash(walletEth.currentAddress)
            const refStrHashed = Web3.utils.keccak256(refStr)

            const refURL = `https://flockez.com?r=${refStr}`
            setEthRefURL(refURL)
            setRefStringHashed(refStrHashed)
            setRefString(refStr);
            const refInfos = await getUserRefInfo(configs, refStr,refStrHashed)
            
            console.log(refInfos)
            setBscRefInfo(refInfos.bsc)
            setEthRefInfo(refInfos.eth)

        }

        if(walletEth.currentAddress){
            getRefData()
        }
    }, [walletEth.currentAddress, lastReload])

    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show success message
            setToastMessage('Copied to clipboard!');
            setShowToast(true);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    useEffect(() => {
       console.log('HEV06BWRSY', Web3.utils.keccak256('HEV06BWRSY') )
    }, [])

    useEffect( () => {
        const arr = ['0xF12C1022D55E2de9D5CF3261cbF0E628E38ef5Ef',
        '0x2DC65f606b73f04c1D9C8a40f631F992C3b10599',
        '0x768397E752880E3Ae21035716126165eb97Ed5f1']

        console.log('-=======================-')
        for(const val of arr){
            const refStr = customHash(val)
            console.log(val)
            console.log(refStr)
            console.log(Web3.utils.keccak256(refStr))
            console.log('-=======================-')

        }
    }, [])

    const handleToastClose = () => {
        setShowToast(false);
    };

    const registerBsc = async () => {
        await walletEth.addNewRef(configs.BSC.ChainId, configs.BSC.addRefFee,walletEth.currentAddress, refString )
        setLastReload(new Date().getTime())


    }

    const registerEth =async () => {
        await walletEth.addNewRef(configs.ETH.ChainId, configs.ETH.addRefFee,walletEth.currentAddress, refString )
        setLastReload(new Date().getTime())

    }

    const EthRefView = () => {
        const isAbleToActiveEth = ethRefInfo?.owner === walletEth.currentAddress || ethRefInfo?.owner ==="0x0000000000000000000000000000000000000000";
        
        return(
            isAbleToActiveEth ?
            <div className={`aff-link ${ethRefInfo?.active ? "active": ""}`}>
                        
                <span className='aff-link-text'> <img width={40} height={40} style={{marginRight:10}} src='/img/wienerdog/ETH.svg' alt='Copy ETH'/> {shortenText(ethRefURL)} </span>
                {
                    ethRefInfo?.active ? 
                    <button onClick={() => copyToClipboard(ethRefURL)} className='aff-cpy-btn'><img src="/img/copy-svgrepo-com.svg" alt="Copy Action" width={20} height={20} /> Copy   </button>
                    :
                    <button className='aff-active-btn' onClick={registerEth}>
                        Active {`${configs.ETH.addRefFee}`} <img width={20} height={20} src='/img/wienerdog/ETH.svg' alt='Active ETH'/></button>
                }

            </div>
            :
            <div>  <img width={20} height={20} src='/img/wienerdog/ETH.svg' alt='Active ETH'/> We are verifying your address to active contribution link</div>
        )


    }

    const BscRefView = () => {
        const isAbleToActive = bscRefInfo?.owner === walletEth.currentAddress || bscRefInfo?.owner ==="0x0000000000000000000000000000000000000000";
        
        return(
            isAbleToActive ?
            <div className={`aff-link ${bscRefInfo?.active ? "active": ""}`}>
                <span className='aff-link-text'><img width={40} height={40} style={{marginRight:10}} src='/img/wienerdog/icon@bnb1.svg' alt='Copy BNB'/>  {shortenText(ethRefURL)}</span>

                {
                bscRefInfo?.active ?
                <button className='aff-cpy-btn' onClick={() => copyToClipboard(ethRefURL)}>
                    <img src="/img/copy-svgrepo-com.svg" alt="Copy Action" width={20} height={20} /> Copy  </button>
                :
                <button className='aff-active-btn' onClick={registerBsc}>
                    Active {`${configs.BSC.addRefFee}`} <img width={20} height={20} src='/img/wienerdog/icon@bnb1.svg' alt='Active BNB'/></button>
                }

            </div> 
            :
            <div> <img width={20} height={20} src='/img/wienerdog/icon@bnb1.svg' alt='Copy BNB'/>  We are verifying your address to active contribution link</div>
        )

    }
    
    
    return (
        <div id="aff" className='aff-container'>
            {showToast && <Toast message={toastMessage} onClose={handleToastClose} />}
            <input type='text' value={refStringHashed} style={{display:"none"}} />
            <div className='aff-form'>
                <div className='aff-intro'>
                      <h2 style={{color: '#ffa500'}}>Join Our Community and Earn Rewards!</h2>
                      
                      <p>
                          We’re excited to <strong>celebrate your contributions</strong> as we work together to grow and enhance our community. Your efforts are invaluable in helping us thrive.
                      </p>
                      
                      <p>
                          Share your <strong>unique contribution link</strong> with friends and invite them to join. As a token of our appreciation, you’ll <strong>earn commissions</strong> for every contribution made through your link. It's our way of saying <strong>thank you</strong> for supporting and participating in our journey!
                      </p>
                </div>

                {!walletEth.currentAddress && 
                <div className='aff-actions'>
                
                    <button
                        type="button"
                        onClick={walletEth.connect}
                        translate="" className="connection-btn">{sectionText?.connectWallet}</button>
                </div>
                }

                {walletEth.currentAddress &&
                <div className='aff-actions'>

                    
                    <EthRefView/>
                    <BscRefView/>
                </div>
                }


            </div>
                                
        </div>
    );
};
