// ApiClient.jsx
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include session cookies
});

// Request Interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor (auto refresh)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token expired (401) and not already tried refresh
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/token/")) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem("refresh_token");

                if (!refresh) {
                    throw new Error("No refresh token");
                }

                const res = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, { refresh });

                const newAccessToken = res.data.access;
                localStorage.setItem("access_token", newAccessToken);

                // Update original request with new token and retry
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                // Refresh failed -> logout
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                return Promise.reject(err);
            }
        }

        const message =
            error.response?.data?.detail ||
            error.message ||
            `HTTP error! status: ${error.response?.status}`;

        return Promise.reject(new Error(message));
    }
);

export default api;