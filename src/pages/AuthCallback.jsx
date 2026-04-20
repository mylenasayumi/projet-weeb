// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authCallbackService from "../services/AuthCallbackService";
import { useLanguage } from "../languages/LanguageContext";

function AuthCallback() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        const handleAuth = async () => {

            try {
                await authCallbackService.handleAuthCallback();
                navigate("/", { replace: true });
            } catch (error) {
                console.error("Error handling auth callback:", error);
                navigate(`/login?error=${error.message}`, { replace: true });
            }
        };

        handleAuth();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">{t("auth.authentification")}</h1>
        </div>
    );
}

export default AuthCallback;