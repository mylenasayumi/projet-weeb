// Api.jsx

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiService = {
    // Service général pour les requêtes API

    async get(endpoint) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async post(endpoint, data) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async put(endpoint, data) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async patch(endpoint, data) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async delete(endpoint) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        // DELETE peut retourner 204 No Content
        if (response.status === 204) {
            return null;
        }

        return response.json();
    },
};

// Services spécifiques pour les articles du blog
export const articleService = {
    getAll: () => apiService.get('/api/articles/'),
    getById: (id) => apiService.get(`/api/articles/${id}/`),
    create: (data) => apiService.post('/api/articles/', data),
    update: (id, data) => apiService.put(`/api/articles/${id}/`, data),
    partialUpdate: (id, data) => apiService.patch(`/api/articles/${id}/`, data),
    delete: (id) => apiService.delete(`/api/articles/${id}/`),
};

// Services spécifiques pour l'analyse de satisfaction (formulaire de contact)
// IMPORTANT: Nécessite une authentification (IsAuthenticated)
export const satisfactionService = {
    create: (data) => apiService.post('/api/satisfactions/', data),
};

// Services spécifiques pour l'authentification (users)
export const authService = {
    register: (userData) => apiService.post('/api/users/', userData), // Créer un nouvel utilisateur (inscription)
    getCurrentUser: () => apiService.get('/api/users/me/'),
    getAll: () => apiService.get('/api/users/'),
    getById: (id) => apiService.get(`/api/users/${id}/`),
    update: (id, data) => apiService.put(`/api/users/${id}/`, data),
    partialUpdate: (id, data) => apiService.patch(`/api/users/${id}/`, data),
    delete: (id) => apiService.delete(`/api/users/${id}/`),
};