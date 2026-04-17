import api from '../config/axios';

export const driverService = {
  getAll: () => api.get('/chauffeurs'),
  getById: (id) => api.get(`/chauffeurs/${id}`),
  create: (data) => api.post('/chauffeurs', data),
  update: (id, data) => api.put(`/chauffeurs/${id}`, data),
  delete: (id) => api.delete(`/chauffeurs/${id}`),
};