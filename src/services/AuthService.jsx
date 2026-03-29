// AuthService.jsx
import apiService from "./ApiService";

// Specific services for users
// TODO : review urls and endpoints
const authService = {
    register: (userData) => apiService.post('/api/users/', userData),
    getCurrentUser: () => apiService.get('/api/users/me/'),
    getAll: () => apiService.get('/api/users/'),
    getById: (id) => apiService.get(`/api/users/${id}/`),
    update: (id, data) => apiService.put(`/api/users/${id}/`, data),
    partialUpdate: (id, data) => apiService.patch(`/api/users/${id}/`, data),
    delete: (id) => apiService.delete(`/api/users/${id}/`),
};

export default authService;