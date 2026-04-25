// PasswordResetService.jsx
// Service to handle password reset requests
// IMPORTANT: Any user can request a password reset, even if user is_active = false
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const passwordResetService = {
    async requestResetPassword(email) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/users/password-reset/request/`,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: false,
                }
            );
            return response.data;
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
            const response = await axios.post(
                `${API_BASE_URL}/api/users/password-reset/confirm/?uidb64=${encodeURIComponent(uidb64)}`,
                { token, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: false,
                }
            );
            return response.data;
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