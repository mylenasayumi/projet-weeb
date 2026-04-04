// AuthCallbackService.jsx
import authService from "./AuthService";
import authTokenService from "./AuthTokenService";

const authCallbackService = {
    async handleAuthCallback() {
        const params = new URLSearchParams(window.location.search);

        const access = params.get("access");
        const refresh = params.get("refresh");
        const error = params.get("error");

        if (error) {
            switch (error) {
                case "access_denied":
                    throw new Error("github_access_denied");
                default:
                    throw new Error(`github_auth_error: ${error}`);
            }
        }

        if (!access || !refresh) {
            throw new Error("github_auth_failed");
        } 

        try {
            // Store tokens
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            
            // Fetch user
            const user = await authService.getCurrentUser();
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (err) {
            // If fetching user fails, clear tokens
            authTokenService.logout();
            localStorage.removeItem("user");

            console.error("Error fetching user after auth callback:", err);
            throw new Error("user_fetch_failed");
        }
    }
};

export default authCallbackService;