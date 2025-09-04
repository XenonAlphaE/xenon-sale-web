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
      img: '/img/default/bnb.svg',
      name: "BNB NETWORK",
      chainId: 56,
      symbol:"bsc"
    },
    eth: {
      img: '/img/default/ETH.svg',
      name: "ETH NETWORK",
      chainId: 1,
      symbol:"eth"

    },
    base: {
      img: '/img/default/base.svg',
      name: "BASE NETWORK",
      chainId: 8453,
      symbol:"eth"

    },
    op: {
      img: '/img/default/optimism.svg',
      name: "OP NETWORK",
      chainId: 10,
      symbol:"eth"
    },
    arb: {
      img: '/img/default/arb.svg',
      name: "Arbitrum One",
      chainId: 42161,
      symbol:"eth"
    }
  };
export const CURRENCIES = {
    bsc:[
        { text: 'BNB', imageSrc: '/img/default/bnb.svg', icon:"/img/default/bnb.svg", curr: CURR_CODE.BNB },
        { text: 'USDT', imageSrc: '/img/default/usdt.svg',  icon:"/img/default/usdt.svg",curr: CURR_CODE.USDT },
        { text: 'CARD', imageSrc: '/img/default/card.svg', icon:"/img/default/usdt.svg", curr: CURR_CODE.USDT },
    ],
    eth:[
        { text: 'ETH', imageSrc: '/img/default/ETH.svg', icon:"/img/default/ETH.svg", curr: CURR_CODE.ETH },
        { text: 'USDT', imageSrc: '/img/default/usdt.svg',  icon:"/img/default/usdt.svg",curr: CURR_CODE.USDT },
        { text: 'CARD', imageSrc: '/img/default/card.svg', icon:"/img/default/usdt.svg", curr: CURR_CODE.USDT },
    ],
    base:[
      { text: 'BASE ETH', imageSrc: '/img/default/base.svg', icon:"/img/default/ETH.svg", curr: CURR_CODE.ETH  },
      { text: 'USDC', imageSrc: '/img/default/usdc.svg',  icon:"/img/default/usdc.svg",curr: CURR_CODE.USDT },
    ],
    op:[
        { text: 'OP ETH', imageSrc: '/img/default/optimism.svg', icon:"/img/default/ETH.svg", curr: CURR_CODE.ETH },
        { text: 'USDT', imageSrc: '/img/default/usdt.svg',  icon:"/img/default/usdt.svg",curr: CURR_CODE.USDT },
    ],
    arb:[
        { text: 'ARB ETH', imageSrc: '/img/default/arb.svg', icon:"/img/default/ETH.svg", curr: CURR_CODE.ETH },
        { text: 'USDT', imageSrc: '/img/default/usdt.svg',  icon:"/img/default/usdt.svg",curr: CURR_CODE.USDT },
    ],


    solana:[
        { text: 'SOLANA', imageSrc: '/img/default/solana.svg', icon:"/img/default/solana.svg", curr: CURR_CODE.SOL },
        // { text: 'USDT', imageSrc: '/img/default/usdt.svg',  icon:"/img/default/usdt.svg",curr: CURR_CODE.USDT },
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
