// SectionAvis.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { satisfactionService } from "../../services/ApiService";
import { authTokenService } from "../../services/AuthTokenService";
import { useNavigate } from "react-router-dom";

function SectionAvis() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        last_name: "",
        first_name: "",
        email: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avis, setAvis] = useState({ type: "", text: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifie l'authentification au chargement du composant
    useEffect(() => {
        const checkAuth = authTokenService.isAuthenticated();
        setIsAuthenticated(checkAuth);
        
        if (!checkAuth) {
            setAvis({
                type: "error",
                text: "Vous devez être connecté pour soumettre un avis. Redirection..."
            });
            
            // Redirige vers la page de connexion après 2 secondes
            setTimeout(() => {
                navigate("/se-connecter");
            }, 2000);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setAvis({ type: "", text: "" });

        try {
            // Vérifie si l'utilisateur est authentifié
            const token = localStorage.getItem('access_token');
            if (!token) {
                setAvis({
                    type: "error",
                    text: "Vous devez être connecté pour soumettre un avis."
                });
                setIsSubmitting(false);
                return;
            }

            // Envoie les données au backend
            await satisfactionService.create(formData);

            // Réinitialise le formulaire et affiche un message de succès
            setFormData({
                last_name: "",
                first_name: "",
                email: "",
                description: ""
            });
            setAvis({
                type: "success",
                text: "Merci pour votre avis ! Votre retour a été enregistré avec succès."
            });

        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            setAvis({
                type: "error",
                text: error.message || "Une erreur s'est produite. Veuillez réessayer."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col items-center text-center">
            <h1 className="md:text-7xl text-5xl font-extrabold m-10">Votre avis compte !</h1>
            <p className="text-lg font-normal m-2 text-center 2xl:mx-100 xl:mx-50 mx-20">Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>

            {/* Messages de feedback */}
            {message.text && (
                <div className={`mt-4 p-4 rounded-lg ${message.type === "success"
                        ? "bg-green-100 text-green-800 border-2 border-green-500"
                        : "bg-red-100 text-red-800 border-2 border-red-500"
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Formulaire Avis */}
            <form
                onSubmit={handleSubmit}
                className="bg-light-purple/10 border-2 border-purple p-8 rounded-2xl shadow-md w-full max-w-md space-y-10 m-16"
            >

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Nom */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="Nom"
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    {/* Prénom */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="Prénom"
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Email"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <textarea
                        id="description"
                        name="description"
                        rows="1"
                        cols="50"
                        value={formData.description}
                        onChange={handleChange}
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Message"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="text-base font-normal flex justify-center">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    </motion.button>
                </div>

            </form>
        </section>
    );
}

export default SectionAvis;


