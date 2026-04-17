import axios from 'axios';

const api = axios.create({
  baseURL: '/api',   // ← appelle le proxy Vite
  headers: { 'Content-Type': 'application/json' }
});

// intercepteur pour le token (inchangé)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;