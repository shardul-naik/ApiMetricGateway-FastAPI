import axiosClient from '../api/axiosClient';

export const getUserKeys = () => axiosClient.get('/keys/');

export const generateUserKey = () => axiosClient.post('/keys/generate');

export const executeTestEndpoint = (endpoint, apiKey) => {
    return axiosClient.get(endpoint, {
        headers: { 'X-API-Key': apiKey },
    });
};