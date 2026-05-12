import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
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

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

// Session API
export const sessionAPI = {
  create: (sessionData) => api.post('/sessions', sessionData),
  getAll: (page = 1, limit = 10) => api.get(`/sessions?page=${page}&limit=${limit}`),
  getOne: (id) => api.get(`/sessions/${id}`),
  delete: (id) => api.delete(`/sessions/${id}`),
  deleteAll: () => api.delete('/sessions')
};

export default api;
