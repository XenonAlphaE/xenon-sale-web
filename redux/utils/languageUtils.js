import { useSelector, useDispatch } from 'react-redux';
import { selectI18nSection, selectLanguageState, setLanguage } from '../ducks/languageDuck'; // Import the selector from the Redux Duck

// Custom hook to select a specific section of i18n data
export const useI18nSection = (sectionKey) => {
  return useSelector(selectI18nSection(sectionKey));
};

// Custom hook to retrieve the current language
export const useLanguage = () => {
    return useSelector(selectLanguageState);
  };

  // Custom hook for setting speed
export const useSetLanguage = () => {
    const dispatch = useDispatch();
    return (key) => {
      dispatch(setLanguage(key));
    };
  };

