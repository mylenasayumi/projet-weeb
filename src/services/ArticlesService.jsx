// ArticlesService.jsx
import apiService from "./ApiService";

// Specific services for blog articles
const articleService = {
    getAll: (params = {}) => {
        const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ""));
        const query = new URLSearchParams(cleanParams).toString();
        const url = query ? `/api/articles/?${query}` : '/api/articles/';
        return apiService.get(url);
    },
    getFromUrl: (url) => apiService.get(url),
    getById: (id) => apiService.get(`/api/articles/${id}/`),
    create: (data) => apiService.post('/api/articles/', data),
    update: (id, data) => apiService.put(`/api/articles/${id}/`, data),
    partialUpdate: (id, data) => apiService.patch(`/api/articles/${id}/`, data),
    delete: (id) => apiService.delete(`/api/articles/${id}/`),
};

export default articleService;