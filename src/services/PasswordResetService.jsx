// PasswordResetService.jsx
// Service to handle password reset requests
// IMPORTANT: Any user can request a password reset, even if user is_active = false
import axios from "axios";

import { API_BASE_URL } from "../constants/api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

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
      const message = getApiErrorMessage(
        error,
        "An error occurred while requesting password reset."
      );
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
      const message = getApiErrorMessage(
        error,
        "An error occurred while confirming password reset."
      );
      throw new Error(message);
    }
  },
};

export default passwordResetService;
