import axiosClient from '../api/axiosClient';

export const getAdminSummary = () => axiosClient.get('/analytics/admin-summary');

export const revokeKey = (keyId) => axiosClient.put(`/keys/revoke/${keyId}`);