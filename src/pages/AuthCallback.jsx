// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../languages/LanguageContext";
import authCallbackService from "../services/AuthCallbackService";

function AuthCallback() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { setAuthenticatedUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await authCallbackService.handleAuthCallback();
        setAuthenticatedUser(user);
        navigate("/");
      } catch (error) {
        console.error("Error handling auth callback:", error);
        navigate(`/login?error=${error.message}`);
      }
    };

    handleCallback();
  }, [navigate, setAuthenticatedUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">{t("auth.authentication")}</h1>
    </div>
  );
}

export default AuthCallback;
