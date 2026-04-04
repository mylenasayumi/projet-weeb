// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authCallbackService from "../services/AuthCallbackService";

function AuthCallback() {
    const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold">Authentification en cours...</h1>
        </div>
    );
}

export default AuthCallback;