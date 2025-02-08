import { useSelector, useDispatch } from 'react-redux';
import {  selectIsMobile, setIsMobile } from '../ducks/mobileDuck'; // Import the selector from the Redux Duck



export const useIsMobile = () => {
    return useSelector(selectIsMobile);
  };

export const useSetMobile= () => {
    const dispatch = useDispatch();
    return (mobile) => {
      dispatch(setIsMobile(mobile));
    };
  };

