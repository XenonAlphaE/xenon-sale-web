import { combineReducers } from 'redux';
import languageReducer from './ducks/languageDuck';
import nativeNetworkReducer from './ducks/nativeNetworkDuck';
const rootReducer = combineReducers({
  language: languageReducer,
  nativeNetwork: nativeNetworkReducer
  // Add other reducers here if needed
});

export default rootReducer;
