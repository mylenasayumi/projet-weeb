// LikesService.jsx
import apiService from "./ApiService";

// Specific services for likes
const likesService = {
  getAll: () => apiService.get("/api/likes/"),
  toggle: (articleId) => apiService.post(`/api/likes/${articleId}/toggle/`),
};

export default likesService;
