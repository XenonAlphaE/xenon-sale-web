
// Action types
const SET_ISMOBILE = 'mbduck/SET_MOBILE'; // New action type for setting language


// Initial state
const initialState = {
    isMobile: false,
};

// Action creators
export const setIsMobile = (mobile) => {
    // Validate language against the valid range
    

      return {
          type: SET_ISMOBILE,
          payload: mobile,
      };

};

// Selectors


export const selectIsMobile = state => state.mobile.isMobile;


// Reducer
const mobileReducer = (state = initialState, action) => {
  switch (action.type) {
        
    case SET_ISMOBILE:
        return { ...state, isMobile: action.payload };

    default:
        return state;
  }
};

export default mobileReducer;
