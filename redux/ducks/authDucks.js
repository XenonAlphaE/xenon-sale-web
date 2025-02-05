import { createAction, createActionTypes } from "./commons";

// 📌 Action Types
const LOGIN = createActionTypes('auth/LOGIN');
const NONCE = createActionTypes('auth/NONCE');

const LOGOUT = 'auth/LOGOUT';

// 📌 Initial State
const initialState = {
    user: null,
    nonce: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

// 📌 Action Creators
export const loginRequest = () => createAction(LOGIN.REQUEST);;
export const loginSuccess = (token, refreshToken) => {
    localStorage.setItem('token', token); // Persist token
    localStorage.setItem('refreshToken', refreshToken); // Persist token
    return createAction(LOGIN.SUCCESS, { token });
};
export const loginFailure = (error) => createAction(LOGIN.FAILURE, error);

export const nonceRequest = () => createAction(NONCE.REQUEST);
export const nonceSuccess = (nonce) => createAction(NONCE.SUCCESS, { nonce });
export const nonceFailure = (error) => createAction(NONCE.FAILURE, error);




export const logout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    return { type: LOGOUT };
};


// 📌 Selector
export const selectAuthState = (state) => state.auth;

// 📌 Reducer
const authReducer = (state = initialState, action) => {
    const handlers = {
        [LOGIN.REQUEST]: (state) => ({ ...state, loading: true, error: null }),
        [NONCE.REQUEST]: (state) => ({ ...state, loading: true, error: null }),

        [LOGIN.SUCCESS]: (state, action) => ({
            ...state,
            token: action.payload.token,
            loading: false,
        }),

        [NONCE.SUCCESS]: (state, action) => ({
            ...state,
            nonce: action.payload.nonce,
            loading: false,
        }),

        [LOGIN.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),

        [NONCE.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),

        [LOGOUT]: () => ({
            ...initialState,
            token: null, // Ensure token is removed on logout
        }),
    };


    return handlers[action.type] ? handlers[action.type](state, action) : state;

};

export default authReducer;
