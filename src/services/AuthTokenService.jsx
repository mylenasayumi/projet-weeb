// AuthTokenService.jsx
import api from "./ApiClient";

// Service to manage authentication tokens
const authTokenService = {
  // Login and JWT token retrieval
  async login(email, password) {
    sessionStorage.removeItem("force_logout");

    const response = await api.post("/api/auth/token/", { email, password });

    const { access } = response.data;
    localStorage.setItem("access_token", access);

    return response.data;
  },

  clearSession() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },

  async logout() {
    sessionStorage.setItem("force_logout", "true");
    try {
      await api.post("/api/auth/logout/");
    } catch {
      console.warn("Backend logout failed, clearing frontend session anyway.");
    } finally {
      this.clearSession();
      sessionStorage.removeItem("force_logout");
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },
};

export default authTokenService;
