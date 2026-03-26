// SatisfactionService.jsx
import apiService from "./ApiService";

// Specific services for satisfaction analysis (contact form)
// IMPORTANT: Requires authentication (IsAuthenticated)
const satisfactionService = {
    create: (data) => apiService.post('/api/satisfactions/', data),
};

export default satisfactionService;