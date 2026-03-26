// ApiService.jsx
import api from "./ApiClient";

// General service for API requests
const apiService = {
    get: (endpoint) => api.get(endpoint).then(res => res.data),
    post: (endpoint, data) => api.post(endpoint, data).then(res => res.data),
    put: (endpoint, data) => api.put(endpoint, data).then(res => res.data),
    patch: (endpoint, data) => api.patch(endpoint, data).then(res => res.data),
    delete: (endpoint) => api.delete(endpoint).then(res => res.data),
};

export default apiService;