// AuthTokenService.jsx

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const authTokenService = {
    // Connexion et récupération des tokens JWT
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/api/auth/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Identifiants invalides');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        return data;
    },

    async refreshToken() {
        const refresh = localStorage.getItem('refresh_token');

        if (!refresh) {
            throw new Error('Aucun token de rafraîchissement disponible');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ refresh }),
        });

        if (!response.ok) {
            this.logout();
            throw new Error('Session expirée');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);

        return data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    }
};