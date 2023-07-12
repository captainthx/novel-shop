import axios, { type AxiosInstance } from 'axios';

// Create a new Axios instance
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APIURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

