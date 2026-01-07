import { useSelector, useDispatch } from 'react-redux';
import {  selectDialogOpen, toggleDialog } from '../ducks/dialogDuck'; // Import the selector from the Redux Duck


// Custom hook to retrieve the current language
export const useSelectChainsOpen = () => {
    return useSelector(state => selectDialogOpen(state, 'selectChainsDialog'));
};


export const useToggleChainsDialog = () => {
    const dispatch = useDispatch();
    return () => {
        dispatch(toggleDialog('selectChainsDialog'));
    };
}