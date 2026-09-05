import axios from 'axios';
import axiosClient from '../api/axiosClient';

export const getUserKeys = () => axiosClient.get('/keys/');

export const generateUserKey = () => axiosClient.post('/keys/generate');

export const executeTestEndpoint = (endpoint, apiKey) => {
    return axios.get(`http://localhost:8000${endpoint}`, {
        headers: { 'X-API-Key': apiKey },
    });
};