// AuthCallbackService.jsx
import authService from "./AuthService";
import authTokenService from "./AuthTokenService";

function getCookie(name) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const target = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return target ? decodeURIComponent(target.split("=")[1]) : null;
}

// Service to manage authentication callbacks
const authCallbackService = {
  async handleAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      switch (error) {
        case "access_denied":
          throw new Error("github_access_denied");
        case "no_code":
          throw new Error("github_no_code");
        case "token_failed":
          throw new Error("github_token_failed");
        case "no_email":
          throw new Error("github_no_email");
        default:
          throw new Error(`github_auth_error: ${error}`);
      }
    }

    const accessToken = getCookie("access_token");

    if (!accessToken) {
      throw new Error("github_auth_failed");
    }

    try {
      // Store token
      localStorage.setItem("access_token", accessToken);

      // return fetched user
      return await authService.getCurrentUser();
    } catch (err) {
      await authTokenService.logout();

      console.error("Error fetching user after auth callback:", err);
      throw new Error("user_fetch_failed");
    }
  },
};

export default authCallbackService;
