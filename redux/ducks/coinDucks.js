import { createAction, createActionTypes } from "./commons";
// 📌 Action Types
const FETCH = createActionTypes('token/FETCH');
const CREATE = createActionTypes('token/CREATE');


// 📌 Initial State
const initialState = {
    coins: [],
    loading: false,
    error: null,
};


// 📌 Action Creators
export const fetchRequest = () => createAction(FETCH.REQUEST);;
export const fetchSuccess = (coins) => {
    return createAction(FETCH.SUCCESS, { coins });
};
export const fetchFailure = (error) => createAction(FETCH.FAILURE, error);


export const createRequest = () => createAction(CREATE.REQUEST);
export const createSuccess = (data) => createAction(CREATE.SUCCESS, { data });
export const createFailure = (error) => createAction(CREATE.FAILURE, error);



const coinReducer = (state = initialState, action) => {
    const handlers = {
        [FETCH.REQUEST]: (state) => ({ ...state, loading: true, error: null }),
        [CREATE.REQUEST]: (state) => ({ ...state, loading: true, error: null }),

        [FETCH.SUCCESS]: (state, action) => {
            return  {    ...state,
                coins: action.payload.coins,
                loading: false,
            }
        },

        [CREATE.SUCCESS]: (state, action) => {
            return {
                ...state,
                coins:  [...state.coins, action.payload.data.token],
                loading: false,
            }
        },

        [FETCH.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),
        [CREATE.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),


      
    };


    return handlers[action.type] ? handlers[action.type](state, action) : state;

};

export default coinReducer;
