import axiosClient from '../api/axiosClient';

export const loginUser = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response = await axiosClient.post('/auth/login', formData);
    return response.data;
};

export const registerUser = (email, password) => {
    return axiosClient.post('/auth/register', { email, password });
};

export const registerAdmin = (email, password, adminKey) => {
    return axiosClient.post(
        '/auth/register-admin',
        { email, password },
        { headers: { 'admin-key': adminKey } }
    );
};