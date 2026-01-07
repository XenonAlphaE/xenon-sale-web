import { combineReducers } from 'redux';
import languageReducer from './ducks/languageDuck';
import nativeNetworkReducer from './ducks/nativeNetworkDuck';
import mobileReducer from './ducks/mobileDuck';
import dialogReducer from './ducks/dialogDuck';

const rootReducer = combineReducers({
  language: languageReducer,
  nativeNetwork: nativeNetworkReducer,
  mobile: mobileReducer,
  dialogs: dialogReducer

  // Add other reducers here if needed
});

export default rootReducer;
