import { useSelector, useDispatch } from 'react-redux';
import { selectNativeNetworkState , selectCurrentAddress, setNetwork,setCurrentAddress } from '../ducks/nativeNetworkDuck'; // Import the selector from the Redux Duck


// Custom hook to retrieve the current language
export const useNativeNetwork = () => {
    return useSelector(selectNativeNetworkState);
  };

export const useCurrentAddress = () => {
    return useSelector(selectCurrentAddress);
};
// Custom hook for setting 
export const useSetNativeNetwork = () => {
    const dispatch = useDispatch();
    return (key) => {
        dispatch(setNetwork(key));
    };
};

// Custom hook for setting 
export const useSetCurrentAddress = () => {
    const dispatch = useDispatch();
    return (address) => {
        dispatch(setCurrentAddress(address));
    };
};

