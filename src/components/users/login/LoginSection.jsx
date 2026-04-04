// LoginSection.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authTokenService from "../../../services/AuthTokenService";
import authService from "../../../services/AuthService";

function LoginSection() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const success = params.get("success");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Login and token retrieval
            await authTokenService.login(formData.email, formData.password);

            // Fetch current user
            const user = await authService.getCurrentUser();

            // Store user info
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to home and refresh to update UI
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err.message || "An error occurred during the connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const url = new URL(window.location);
            url.searchParams.delete("success");
            window.history.replaceState({}, "", url);
        }
    }, [success]);

    return (
        <section className="flex flex-col items-center my-10">
            <h1 className="md:text-7xl text-5xl font-extrabold">Se connecter</h1>

            {/* After creating an account, the user is redirected to the login page and a success message is displayed. */}
            {success === "account_created" && (
                <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded mt-4">
                    Votre compte a été créé avec succès. Il doit être activé par un administrateur.
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 w-full max-w-md space-y-8">
                {/* Affichage d'erreur de connexion */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Email"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Password"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="text-base font-normal flex justify-center">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        disabled={loading}
                    >
                        {loading ? "Connexion..." : "Se connecter"}

                    </motion.button>
                </div>
            </form>

            <a href="#mot-de-passe-oublie" className="hover:text-light-purple">Mot de passe oublié ?</a>

            <p className="text-light-gray my-10 mx-10 text-center">
                Vous n’avez pas de compte ? Vous pouvez en
                <a href="/sign-up" className="text-white hover:text-light-purple"> créer un</a>
            </p>

            {/* Divider */}
            <div className="flex items-center my-10 w-full max-w-md">
                <hr className="flex-grow border-t border-gray-500" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="flex-grow border-t border-gray-500" />
            </div>

            {/* Github OAuth */}
            <div className="flex justify-center">
                <motion.button
                        type="button"
                        onClick={() => {
                            window.location.href = `${API_BASE_URL}/api/auth/github/`;
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="bg-gray-700 text-white px-6 py-3 rounded-[8px] border-2 border-white hover:bg-gray-600 cursor-pointer"
                    >
                        Continuer avec GitHub
                </motion.button>
            </div>
        </section>
    );
}

export default LoginSection;