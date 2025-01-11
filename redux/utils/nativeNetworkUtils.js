import { useSelector, useDispatch } from 'react-redux';
import { selectNativeNetworkState , selectCurrentAddress, setNetwork,setCurrentAddress } from '../ducks/nativeNetworkDuck'; // Import the selector from the Redux Duck
import { useAccount, useChainId } from 'wagmi'


// // Custom hook to retrieve the current language
export const useNativeNetwork = () => {
    const chainId = useChainId()
    switch(chainId){
        case 1:
            return"eth";
        case 56:
            return"bsc";
        case 8453:
            return"base";
        case 10:
            return"op";
        case 42161:
            return"arb";
        default:
            return"eth";
    }
  };

// export const useCurrentAddress = () => {
//     return useSelector(selectCurrentAddress);
// };
// // Custom hook for setting 
// export const useSetNativeNetwork = () => {
//     const dispatch = useDispatch();
//     return (key) => {
//         dispatch(setNetwork(key));
//     };
// };

// // Custom hook for setting 
// export const useSetCurrentAddress = () => {
//     const dispatch = useDispatch();
//     return (address) => {
//         dispatch(setCurrentAddress(address));
//     };
// };

