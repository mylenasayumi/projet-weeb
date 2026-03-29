// AuthTokenService.jsx
import api from "./ApiClient";

const authTokenService = {
    // Login and JWT token retrieval
    async login(email, password) {
        try {
            const response = await api.post("/api/auth/token/", {
                email,
                password
            });

            const { access, refresh } = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            return response.data;
        } catch (error) {
            console.log(error.response?.data);
            const message =
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Invalid credentials";
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