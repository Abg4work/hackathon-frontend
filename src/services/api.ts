import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const api = axios.create({
  baseURL: 'http://139.167.55.58:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      autoHideDuration: 3000,
    });

    return Promise.reject(error);
  }
);

export default api; 