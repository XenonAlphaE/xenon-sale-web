
// Action types
const TOGGLE_DIALOG = 'dialogDuck/TOGGLE_DIALOG';


// Initial state
const initialState = {
};

// Action creators
export const toggleDialog = dialogName => ({
  type: TOGGLE_DIALOG,
  payload: { dialogName },
});

// Selectors


export const selectDialogOpen =  (state, dialogName) => state.dialogs?.[dialogName] ?? false;


// Reducer
const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
        
    case TOGGLE_DIALOG:
        const { dialogName } = action.payload;
        return { ...state, [dialogName]: !state[dialogName] };

    default:
        return state;
  }
};

export default dialogReducer;
