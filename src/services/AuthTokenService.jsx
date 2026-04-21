// AuthTokenService.jsx
import api from "./ApiClient";

// Service to manage authentication tokens
const authTokenService = {
    // Login and JWT token retrieval
    async login(email, password) {
        try {
            const response = await api.post("/api/auth/token/", {
                email,
                password
            });

            const { access } = response.data;
            localStorage.setItem("access_token", access);

            return response.data;
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("LOGIN ERROR RESPONSE:", error.response);

            const message =
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Invalid credentials";

            throw new Error(message);
        }
    },

    async logout() {
        try {
            await api.post("/api/auth/logout/");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
        }
    },

    isAuthenticated() {
        return !!localStorage.getItem("access_token");
    }
};

export default authTokenService;