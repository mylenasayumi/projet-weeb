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

  clearSession({ notify = true } = {}) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.setItem("logout_event", Date.now().toString());

    if (notify) {
      window.dispatchEvent(new Event("auth_changed"));
    }
  },

  async logout() {
    try {
      await api.post("/api/auth/logout/");
    } catch {
      console.warn("Backend logout failed, clearing frontend session anyway.");
    } finally {
      this.clearSession();
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },

  clearSessionSilently() {
    this.clearSession({ notify: false });
  },
};

export default authTokenService;
