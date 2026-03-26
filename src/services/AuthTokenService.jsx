// AuthTokenService.jsx
import api from "./ApiClient";

const authTokenService = {
    // Login and JWT token retrieval
    async login(email, password) {
        try {
            const response = await api.post("/api/auth/token/", { email, password });

            const data = response.data;
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            return data;
        } catch (error) {
            const message =
                error.response?.data?.detail || "Invalid credentials";
            throw new Error(message);
        }
    },

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    },

    isAuthenticated() {
        return !!localStorage.getItem("access_token");
    }
};

export default authTokenService;