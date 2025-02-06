import { loginRequest, loginSuccess, loginFailure, profileFailure, profileRequest, profileSuccess} from '../ducks/authDucks';
import API from "./api";


// 📌 Thunk for Logging In
export const getNonce = async (address) => {
    try {
        debugger
        const response = await API.post("/api/auth/nonce", {address});
        debugger
        return response

       
    } catch (error) {
        return ""
    }
};



export const loginUser = (signedMessage, address) => async (dispatch) => {
    if (!signedMessage || !address) {
        return;
    }

    dispatch(loginRequest());

    try {
        const response = await API.post("/api/auth/login", {
            address,
            signature: signedMessage,
        });

        const data = await response.data;
        
        dispatch(loginSuccess(data.accessToken, data.refreshToken)); // Store user & token
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};


export const fetchUser = () => async (dispatch) => {
    dispatch(profileRequest());

    try {
        const response = await API.get("/api/auth/profile");
        debugger
        const data = await response.data;
        
        dispatch(profileSuccess(data)); // Store user & token
    } catch (error) {
        dispatch(profileFailure(error.message));
    }
};

