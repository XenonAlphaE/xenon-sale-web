import { combineReducers } from 'redux';
import languageReducer from './ducks/languageDuck';
import nativeNetworkReducer from './ducks/nativeNetworkDuck';
import authReducer from './ducks/authDucks';
const rootReducer = combineReducers({
  language: languageReducer,
  nativeNetwork: nativeNetworkReducer,
  auth: authReducer
  // Add other reducers here if needed
});

export default rootReducer;
