// SectionSeConnecter.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authTokenService } from "../../services/AuthTokenService";

function SectionSeConnecter() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            await authTokenService.login(formData.email, formData.password);
            // Redirection après connexion réussie
            navigate("/");
        } catch (err) {
            setError(err.message || "Une erreur s'est produite lors de la connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center my-10">
            <h1 className="md:text-7xl text-5xl font-extrabold">Se connecter</h1>

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
                <a href="/inscription" className="text-white hover:text-light-purple"> créer un</a>
            </p>
        </section>
    );
}

export default SectionSeConnecter;