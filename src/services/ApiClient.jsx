// ApiClient.jsx
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url || "";
        const isRefreshRequest = requestUrl.includes("/api/auth/token/refresh/");
        const isLoginRequest = requestUrl === "/api/auth/token/" || requestUrl.endsWith("/api/auth/token/");
        const isLogoutRequest = requestUrl.includes("/api/auth/logout/");

        if (
            error.response?.status === 401 &&
            !originalRequest?._retry &&
            !isRefreshRequest &&
            !isLoginRequest &&
            !isLogoutRequest
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${API_BASE_URL}/api/auth/token/refresh/`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.access;
                localStorage.setItem("access_token", newAccessToken);

                // Update original request with new token and retry
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;