// ArticlesService.jsx
import apiService from "./ApiService";

// Specific services for blog articles
const articleService = {
    getAll: () => apiService.get('/api/articles/'),
    getById: (id) => apiService.get(`/api/articles/${id}/`),
    create: (data) => apiService.post('/api/articles/', data),
    update: (id, data) => apiService.put(`/api/articles/${id}/`, data),
    partialUpdate: (id, data) => apiService.patch(`/api/articles/${id}/`, data),
    delete: (id) => apiService.delete(`/api/articles/${id}/`),
};

export default articleService;