import axios from 'axios';

// Vercel supplies VITE_API_URL at build time. During `vite` development we
// deliberately target the local FastAPI process instead.
const apiBaseUrl = import.meta.env.VITE_API_URL
    || (import.meta.env.DEV ? 'http://localhost:8000' : undefined);

const axiosClient = axios.create({
    baseURL: apiBaseUrl,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
