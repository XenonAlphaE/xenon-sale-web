import axios from "axios";
import store from "../store"; // Import Redux store

const API = axios.create({
    baseURL: "http://localhost:3000",
});

// Attach token automatically
API.interceptors.request.use((config) => {
    const state = store.getState(); // Get Redux state
    const token = state.auth.token; // Get token from Redux store

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token
    }

    return config;
}, (error) => Promise.reject(error));

export default API;
