import { combineReducers } from 'redux';
import languageReducer from './ducks/languageDuck';
import nativeNetworkReducer from './ducks/nativeNetworkDuck';
import authReducer from './ducks/authDucks';
import coinReducer from './ducks/coinDucks';
import { LOGOUT } from './ducks/authDucks';
// Root reducer combining all individual reducers
const appReducer = combineReducers({
  language: languageReducer,
  nativeNetwork: nativeNetworkReducer,
  auth: authReducer,
  coin: coinReducer,
});

// Root reducer wrapper to handle state reset
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined; // Reset state
  }
  return appReducer(state, action);
};

export default rootReducer;
