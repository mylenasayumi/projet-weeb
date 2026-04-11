// ForgotPassword.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import passwordResetService from "../services/PasswordResetService";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await passwordResetService.requestResetPassword(email);
            setMessage(response.message || "If an account is associated with this email, you will receive instructions to reset your password.");
            setEmail("");
        } catch (err) {
            setError(err.message || "An error occurred while requesting password reset.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center my-10">
            <h1 className="md:text-6xl text-5xl font-extrabold">Mot de passe oublié</h1>

            <form onSubmit={handleSubmit} className="p-8 w-full max-w-md space-y-8">
                {message && (
                    <div className="bg-green-100 border border-green-500 text-green-500 px-4 py-3 rounded">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-500 text-red-500 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                <div>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="E-mail"
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-center text-base">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        disabled={loading}
                    >
                        {loading ? "Envoi en cours..." : "Envoyer le lien"}
                    </motion.button>
                </div>
            </form>
        </section>
    );
};

export default ForgotPassword;