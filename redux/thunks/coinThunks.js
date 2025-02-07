import { 
    fetchRequest,fetchFailure,fetchSuccess,
    createFailure,createRequest,createSuccess
} from '../ducks/coinDucks';
import API from "./api";


// ✅ Create Token (Thunk)
export const createToken = (formData) => async (dispatch) => {
    dispatch(createRequest());
    try {
        const response = await API.post("/api/tokens", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        debugger
        dispatch(createSuccess(response.data));
    } catch (error) {
        dispatch(createFailure(error.message));
    }
};


// ✅ Fetch Tokens (Thunk)
export const fetchTokens = () => async (dispatch) => {
    dispatch(fetchRequest());
    try {
        const response = await API.get("/api/tokens/list");
        dispatch(fetchSuccess(response.data));
    } catch (error) {
        dispatch(fetchFailure(error.message));
    }
};