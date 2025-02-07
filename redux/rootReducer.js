import { combineReducers } from 'redux';
import languageReducer from './ducks/languageDuck';
import nativeNetworkReducer from './ducks/nativeNetworkDuck';
import authReducer from './ducks/authDucks';
import coinReducer from './ducks/coinDucks';
const rootReducer = combineReducers({
  language: languageReducer,
  nativeNetwork: nativeNetworkReducer,
  auth: authReducer,
  coin: coinReducer
  // Add other reducers here if needed
});

export default rootReducer;
