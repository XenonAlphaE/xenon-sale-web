// languageDuck.js
// Redux Duck for managing language
import i18nData from '../data/i18n.json'

// Action types
const SET_LANGUAGE = 'language/SET_LANGUAGE'; // New action type for setting language

// Valid ranges for language and speed
const VALID_LANGUAGES = ['en', 'zh', 'es', 'ge', 'jp', 'de', 'vi']; // Example valid language codes

 // Helper function to get the browser's default language
const getBrowserLanguage = () => {
  const browserLanguage = navigator.language || navigator.userLanguage;
  return browserLanguage ? browserLanguage.split('-')[0] : 'en'; // Extract the language code without region
};

// Determine the initial language
const determineInitialLanguage = () => {
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage && VALID_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguage = getBrowserLanguage();
  if (VALID_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  return 'en'; // Default to 'en' if browser language is not valid
};

// Initial state
const initialState = {
    language: determineInitialLanguage(),
};

// Action creators
export const setLanguage = (language) => {
    // Validate language against the valid range
    
    if (VALID_LANGUAGES.includes(language)) {
        localStorage.setItem('language', language);

        return {
            type: SET_LANGUAGE,
            payload: language,
        };
    } else {
      console.error('Invalid language value.');
      return { type: 'INVALID_ACTION' }; // or throw an error
    }
};

// Selectors
export const selectI18nSection = (sectionKey) => (state) => {
  const language = state.language.language;
  return i18nData[language][sectionKey] || {};
};

export const selectLanguageState = state => state.language.language;


// Reducer
const languageReducer = (state = initialState, action) => {
  switch (action.type) {
        
    case SET_LANGUAGE:
        return { ...state, language: action.payload };

    default:
        return state;
  }
};

export default languageReducer;
