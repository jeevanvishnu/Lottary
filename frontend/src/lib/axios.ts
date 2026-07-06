import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://lottary-sppr.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("adminUser");
      window.dispatchEvent(new Event("admin-unauthorized"));
    }
    return Promise.reject(error);
  }
);
