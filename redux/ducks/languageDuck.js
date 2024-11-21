// languageDuck.js
// Redux Duck for managing language
import en from '../../locales/en.json';
import vi from '../../locales/vi.json';
import zh from '../../locales/zh.json';
import es from '../../locales/es.json';
import ka from '../../locales/ka.json';
import jp from '../../locales/jp.json';
import de from '../../locales/de.json';
import fr from '../../locales/fr.json';
import it from '../../locales/it.json';
import pt from '../../locales/pt.json';
import ru from '../../locales/ru.json';
import ar from '../../locales/ar.json';
import hi from '../../locales/hi.json';
import ko from '../../locales/ko.json';
import th from '../../locales/th.json';
import nl from '../../locales/nl.json';
import tr from '../../locales/tr.json';
import el from '../../locales/el.json';
import sv from '../../locales/sv.json';
import he from '../../locales/he.json';
import uk from '../../locales/uk.json';
import ms from '../../locales/ms.json';
import id from '../../locales/id.json';
import fa from '../../locales/fa.json';
import bn from '../../locales/bn.json';
import ta from '../../locales/ta.json';
import pl from '../../locales/pl.json';

const i18nData = {
  en,
  vi,
  zh,
  es,
  ka,
  jp,
  de,
  fr,
  it,
  pt,
  ru,
  ar,
  hi,
  ko,
  th,
  nl,
  tr,
  el,
  sv,
  he,
  uk,
  ms,
  id,
  fa,
  bn,
  ta,
  pl,
}
// Action types
const SET_LANGUAGE = 'language/SET_LANGUAGE'; // New action type for setting language

// Valid ranges for language and speed
const VALID_LANGUAGES = ['ar', 'bn', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he', 'hi', 'id', 'it', 'jp', 'ka', 'ko', 'ms', 'nl', 'pl', 'pt', 'ru', 'sv', 'ta', 'th', 'tr', 'uk', 'vi', 'zh']; // Example valid language codes

 // Helper function to get the browser's default language
const getBrowserLanguage = () => {
  const browserLanguage = navigator.language || navigator.userLanguage;
  return browserLanguage ? browserLanguage.split('-')[0] : 'en'; // Extract the language code without region
};


// Initial state
const initialState = {
    language: 'en',
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
      // console.error('Invalid language value.');
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
