import { createAction, createActionTypes } from "./commons";

// 📌 Action Types
const LOGIN = createActionTypes('auth/LOGIN');
const PROFILE = createActionTypes('auth/PROFILE');

export const LOGOUT = 'auth/LOGOUT';

// 📌 Initial State
const initialState = {
    profile: null,
    token: null,
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

export const profileRequest = () => createAction(PROFILE.REQUEST);
export const profileSuccess = (profile) => createAction(PROFILE.SUCCESS, { profile });
export const profileFailure = (error) => createAction(PROFILE.FAILURE, error);




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
        [PROFILE.REQUEST]: (state) => ({ ...state, loading: true, error: null }),

        [LOGIN.SUCCESS]: (state, action) => ({
            ...state,
            token: action.payload.token,
            loading: false,
        }),

        [PROFILE.SUCCESS]: (state, action) => ({
            ...state,
            profile: action.payload.profile,
            loading: false,
        }),

        [LOGIN.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),
        [PROFILE.FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false,
        }),

    };


    return handlers[action.type] ? handlers[action.type](state, action) : state;

};

export default authReducer;
