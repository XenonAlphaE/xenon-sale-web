// nativeNetworkDuck.js
// Redux Duck for managing native network

// Action types
const SET_NATIVE_NETWORK = 'nn/SET_NETWORK'; // New action type for setting language
const SET_CURRENT_ADDRESS = 'nn/SET_ADDRESS'; // New action type for setting language


export const CURR_CODE = {
    BNB: "BNB",
    USDT:"BSC",
    ETH:"ETH",
    SOL: "SOL"
}


// Valid ranges for language and speed
export const VALID_NETWORKS = ['bsc', 'eth']; // Example valid codes

export const NETWORK_OTIONS = {
    bsc: {
      img: '/img/flockers/icon@bnb1.svg',
      name: "BNB NETWORK",
      chainId: 56,
      symbol:"bsc"
    },
    eth: {
      img: '/img/flockers/ETH.svg',
      name: "ETH NETWORK",
      chainId: 1,
      symbol:"eth"

    },
    base: {
      img: '/img/wepe/base.svg',
      name: "BASE NETWORK",
      chainId: 8453,
      symbol:"eth"

    }
  };
export const CURRENCIES = {
    bsc:[
        { text: 'BNB', imageSrc: '/img/flockers/icon@bnb1.svg', icon:"/img/flockers/icon@bnb1.svg", curr: CURR_CODE.BNB },
        { text: 'USDT', imageSrc: '/img/flockers/usdt.svg',  icon:"/img/flockers/usdt.svg",curr: CURR_CODE.USDT },
    ],
    eth:[
        { text: 'ETH', imageSrc: '/img/flockers/ETH.svg', icon:"/img/flockers/ETH.svg", curr: CURR_CODE.ETH },
        { text: 'USDT', imageSrc: '/img/flockers/usdt.svg',  icon:"/img/flockers/usdt.svg",curr: CURR_CODE.USDT },
    ],
    base:[
        { text: 'BASE ETH', imageSrc: '/img/flockers/ETH.svg', icon:"/img/flockers/ETH.svg", curr: CURR_CODE.ETH },
        { text: 'USDC', imageSrc: '/img/default/usdc.svg',  icon:"/img/default/usdc.svg",curr: CURR_CODE.USDT },
    ],




}

// Initial state
const initialState = {
    network: 'eth',
    currentAddress: ''
};

// Action creators
export const setNetwork = (network) => {    
    if (VALID_NETWORKS.includes(network)) {
        return {
            type: SET_NATIVE_NETWORK,
            payload: network,
        };
    } else {
      console.error('Invalid language value.');
      return { type: 'INVALID_ACTION' }; // or throw an error
    }
};

export const setCurrentAddress = (address) => {    
    return {
        type: SET_CURRENT_ADDRESS,
        payload: address,
    };
};

// Selectors
// export const selectI18nSection = (sectionKey) => (state) => {
//   const language = state.language.language;
//   return i18nData[language][sectionKey] || {};
// };

export const selectNativeNetworkState = state => state.nativeNetwork.network;
export const selectCurrentAddress = state => state.nativeNetwork.currentAddress;


// Reducer
const nativeNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
        
    case SET_NATIVE_NETWORK:
        return { ...state, network: action.payload };

    case SET_CURRENT_ADDRESS:
      
      return { ...state, currentAddress: action.payload };

    default:
        return state;
  }
};

export default nativeNetworkReducer;
