import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

/**
 * Shared Axios instance for all backend calls.
 * Base URL comes from VITE_API_URL so local and production stay in sync.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Normalizes Axios / network errors into a readable message.
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  if (!error.response) {
    return 'Unable to reach the server. Check your connection and API URL.';
  }

  return 'Something went wrong. Please try again.';
};

/**
 * GET /api/pincode/:pin
 * @param {string} pin
 */
export const fetchPincodeDetails = async (pin) => {
  const { data } = await api.get(`/api/pincode/${pin}`);
  return data;
};

/**
 * GET /api/history
 */
export const fetchSearchHistory = async () => {
  const { data } = await api.get('/api/history');
  return data;
};

export default api;
