import API from './api';

export const authService = {
  register: async (data) => {
    const response = await API.post('/auth/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await API.post('/auth/login', data);
    return response.data;
  },

  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },
};