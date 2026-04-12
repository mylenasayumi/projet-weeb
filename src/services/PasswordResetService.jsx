// PasswordResetService.jsx
import apiService from "./ApiService";

// Service to handle password reset requests
// IMPORTANT: Any user can request a password reset, even if user is_active = false
const passwordResetService = {  
    async requestResetPassword(email) {
        try {
            return await apiService.post("/api/users/password-reset/request/", {
                email,
                frontend_url: window.location.origin,
            });
        } catch (error) {
            const message =
                error.response?.data?.email?.[0] ||
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "An error occurred while requesting password reset.";
            throw new Error(message);
        }
    },

    async confirmResetPassword(uidb64, token, password) {
        try {
            return await apiService.post(
                `/api/users/password-reset/confirm/?uidb64=${encodeURIComponent(uidb64)}`,
                {
                    token,
                    password
                }
            );
        } catch (error) {
            const message =
                error.response?.data?.token?.[0] ||
                error.response?.data?.password?.[0] ||
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "An error occurred while confirming password reset.";
            throw new Error(message);
        }
    }
};

export default passwordResetService;