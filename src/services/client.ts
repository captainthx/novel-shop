import { useAuthStore } from '@/stores/auth';
import axios, { type AxiosInstance } from 'axios';
import { storeToRefs } from 'pinia';
const { token } = storeToRefs(useAuthStore());

// Create a new Axios instance
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APIURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value?.accessToken}`,
    },
});

export default api;
