import { useEffect, useState } from 'react';
import { ethers,parseEther,Network, parseUnits } from 'ethers';
import './App.css';

import { Tsunami } from 'react-bootstrap-icons'

import configs from '../config.main.json'

// const CONTRACT_ADDRESS = '0x4bb0416c72344a1ebf11183b0a02b0fbf2132019'
// const CONTRACT_ADDRESS = '0xf8b2E669fd2DCb580937CB89341b6570667cec8d'



// const USDT_ADDRESS = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'
// const USDT_ADDRESS = '0x8f9eAD8B0E61E986AFcE9C623B0f78Dec8D53109'
// const USDT_DECIMALS= 6

function App() {
  const [nativeNetwork, setNativeNetwor] = useState('ETH')
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [salerContract, setSalerContract] = useState(undefined);
  const [usdtContract, setUsdtContract] = useState(undefined);
  const [usdtDecimals, setUsdtDecimals] = useState(6);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [amount, setAmount] = useState(0)
  const [globalConfigs, setGlobalConfigs] = useState(undefined)
  const [boughtTokens, setBoughtTokens] = useState(0)
  const [tokenPriceInUsdt, setTokenPriceInUsdt] = useState()
  const [totalSold, setTotalSold] = useState(0)
  // const [network, setNetwork] = useState(null);

  function isValidNumber() {
    // Check for empty string
    if (!amount) {
      return false;
    }
  
    // Attempt to convert the value to a number using parseFloat
    const numberValue = parseFloat(amount);
  
    // Check if the conversion was successful (not NaN) and the value is finite (not Infinity or -Infinity)
    return !isNaN(numberValue) && isFinite(numberValue);
  }
  

  useEffect(() => {

    const loadBoughtTokens  = async () => {
      const key = Web3.utils.soliditySha3(signerAddress, globalConfigs?.BSC?.targetToken?.symbol);
      const purchaseInfo = await salerContract.buyerPurchases(key)
      const tokenPrice = await salerContract.tokenPriceInUsdt()
      const totalSold = await salerContract.totalsold()
      debugger
      setBoughtTokens( formatUnits(purchaseInfo['amount'], 18))
      setTokenPriceInUsdt( formatUnits(tokenPrice, 6).toString())
      setTotalSold( formatUnits(totalSold, 18))

    }
    loadBoughtTokens()
  }, [salerContract])

  useEffect(() => {
      setGlobalConfigs(configs)
     
      let signer = null;
      let provider;
      const connectMetamask = async () => {
        if (window.ethereum == null) {

            // If MetaMask is not installed, we use the default provider,
            // which is backed by a variety of third-party services (such
            // as INFURA). They do not have private keys installed,
            // so they only have read-only access
            console.log("MetaMask not installed; using read-only defaults")
            provider = ethers.getDefaultProvider()

        } else {

            // Connect to the MetaMask EIP-1193 object. This is a standard
            // protocol that allows Ethers access to make all read-only
            // requests through MetaMask.
            // provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org/apis/v3"); // BSC Testnet provider
            // const bscTestNet = new Network("Smart Chain - Testnet", 97)
            // const sepoliaTestNet = new Network("Sepolia test network", 11155111)

            // provider = new ethers.BrowserProvider(window.ethereum, bscTestNet)
            provider = new ethers.BrowserProvider(window.ethereum, "any")
            provider.on("network", (newNetwork, oldNetwork) => {
                // When a Provider makes its initial connection, it emits a "network"
                // event with a null oldNetwork along with the newNetwork. So, if the
                // oldNetwork exists, it represents a changing network
                if (oldNetwork) {
                    window.location.reload();
                }
            });
          
            // provider.on("network", (newNetwork, oldNetwork) => {
            //   debugger
            //   console.log("Network changed from", oldNetwork, "to", newNetwork);
            //   if (oldNetwork && newNetwork.chainId !== oldNetwork.chainId) {
            //     // Network ID has changed, reload the window
            //     window.location.reload();
            //   }
            // });
            // It also provides an opportunity to request access to write
            // operations, which will be performed by the private key
            // that MetaMask manages for the user.
            signer = await provider.getSigner();
        }

  
    
        

        setSigner(signer)
        setSignerAddress(signer.address)

        const usdtContract = new ethers.Contract(
          configs[nativeNetwork]['USDT_Address'],
          configs[nativeNetwork]['USDT_Abi'],
          provider
        )
          
        setUsdtContract(usdtContract)
        setUsdtDecimals(configs[nativeNetwork]['USDT_Decimals'])


        
        const salerInfo = configs[nativeNetwork]['salers'][0]
        
        const contract = new ethers.Contract(
          salerInfo.address,
          salerInfo.abi,
          provider
          )
        setSalerContract(contract)
        
          
            
            // Add event listener for network change
            // provider.on("network", handleNetworkChange);
            setProvider(provider)
      
      };
          
      connectMetamask();

      // Cleanup function to remove event listener on unmount
      return () => {
        if(provider){
          provider.removeListener("network");
        }
      };
  }, [])
 


  const checkNetwork = async () => {
    const network = await provider.getNetwork();
     // Check if the network matches your desired network ID (e.g., mainnet = 1)
     if (network && network.chainId.valueOf()  == globalConfigs[nativeNetwork]['ChainId']) { // Replace 1 with the desired network ID
      return true
    }
    console.warn(`Please switch to the ${globalConfigs[nativeNetwork]['NetworkName']} (network ID ${configs[nativeNetwork]['ChainId']})!`);
    // Optionally, provide a user-friendly switch button (explained later)

    // Don't proceed unless user confirms switching (explained later)
    if (!window.confirm(`Switch to ${globalConfigs[nativeNetwork]['NetworkName']}?`)) {
      return false
    }

    // If confirmation received, attempt to switch network
    try {
      // await provider.send("eth_requestAccounts", []); // Request accounts
      await provider.send("wallet_switchEthereumChain", [{ chainId: "0x" + globalConfigs[nativeNetwork]['ChainId'].toString(16) }]); // Switch to mainnet (replace "0x1" for other networks)
    } catch (error) {
      console.error("Error switching network:", error.message);
    }
    return false


  }

  const isConnected = () => (signer !== undefined)

  const connect = () => {
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
    })
  }

  const getSigner = async provider => {
    const signer = await provider.getSigner();

    signer.getAddress()
      .then((address) => {
        setSignerAddress(address)
      })

    return signer;
  }

  const toWei = ether => parseEther(ether)

  const buyTokens = async () => {
    try{
      if(await checkNetwork() && isValidNumber()){
        const wei = toWei(amount)
        const tx = await salerContract.connect(signer).buyTokens(globalConfigs.targetToken.symbol, {value: wei})
        await tx.wait();
        console.log("Tokens bought successfully.");
      }
    }
    catch(error){
      console.error("Error:", error.message);
    }
   
    
  }
  async function approveUSDT_BSC() {
    try{
      const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)

      // const tx = await usdtContract.approve(CONTRACT_ADDRESS, usdtAmount)
      // const tx = await usdtContract.approve(signerAddress, usdtAmount)
      const tx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount)

      // const tx = await usdtContract.approve(yourContractAddress, usdtAmountInWei);
      await tx.wait();
      console.log("USDT spending approved!");
    }
    catch (error) {
      console.error("Error during approval:", error.message);
      // Handle the error appropriately (e.g., display a user-friendly message)
    }
  }
  
  async function approveUSDT_ETH() {
    try {
      const usdtAmount = parseUnits(amount, usdtDecimals);
  
      // Check allowance using a separate function for clarity
      const currentAllowance = await usdtContract.allowance(signer.address, salerContract.target);

      if (currentAllowance < usdtAmount) {
        // Revoke existing allowance only if it's not already 0
        if (currentAllowance !== parseUnits('0', usdtDecimals)) {
          const revokeTx = await usdtContract.connect(signer).approve(salerContract.target, 0);
          await revokeTx.wait();
          console.log("Existing allowance revoked successfully (if any)");
        }
  
        // Approve new allowance
        const approvalTx = await usdtContract.connect(signer).approve(salerContract.target, usdtAmount);
        await approvalTx.wait();
        console.log("New allowance set successfully!");
      }
    } catch (error) {
      console.error("Error during approval:", error.message);
      // Handle the error appropriately (e.g., display a user-friendly message)
    }
  }
  
  

  async function buyTokensBySpecificAmountUSDT() {
    const usdtAmount = parseUnits(amount, usdtDecimals); // Set the allowance amount (1000 USDT in this case)
    const tx = await salerContract.connect(signer).buyTokensWithUSDT(usdtAmount);
    await tx.wait();
    console.log("Tokens purchased successfully!");
  }
  

  
  const buyTokensUSDT = async () => {
    try{
      if(await checkNetwork() && isValidNumber()){
        if(nativeNetwork === "BSC"){
          await approveUSDT_BSC();
        }else{
          
          await approveUSDT_ETH();
        }
        await buyTokensBySpecificAmountUSDT();
      }
    }
    catch(error){
      console.error("Error during buying:", error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {isConnected() ? (
          <div>
            <p>
              Welcome {signerAddress?.substring(0,10)}...
            </p>
            <div className="list-group">
              <div className="list-group-item">
                <div className="row py-3">

                  <div className="col-md-2">
                    <Tsunami className="rounded-circle" width="36" height="36" />
                  </div>

                  <div className="col-md-5">
                    <input
                      className="inputField"
                      placeholder="0.0"
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-4 col-md-3">
                    Tokens
                  </div>

                  <div className="d-flex gap-4 col-md-2">
                    <button
                      class="btn btn-success"
                      onClick={() => buyTokens()}>
                      Buy
                    </button>
                  </div>
                  <div className="d-flex gap-4 col-md-2">
                    <button
                      class="btn btn-success"
                      onClick={() => buyTokensUSDT()}>
                      Buy by USDT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              You are not connected
            </p>
            <button onClick={connect} className="btn btn-primary">Connect Metamask</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;