// AuthService.jsx
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import apiService from "./ApiService";

// Specific services for users
const authService = {
  register: async (userData) => {
    try {
      return await apiService.post("/api/users/", userData);
    } catch (error) {
      const message = getApiErrorMessage(error, "Error while registering.");
      throw new Error(message);
    }
  },
  getCurrentUser: () => apiService.get("/api/users/me/"),
  getAll: () => apiService.get("/api/users/"),
  getById: (id) => apiService.get(`/api/users/${id}/`),
  update: (id, data) => apiService.put(`/api/users/${id}/`, data),
  partialUpdate: (id, data) => apiService.patch(`/api/users/${id}/`, data),
  delete: (id) => apiService.delete(`/api/users/${id}/`),
};

export default authService;
