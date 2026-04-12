import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import passwordResetService from "../services/PasswordResetService";
import { motion } from "framer-motion";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const uidb64 = params.get("uidb64");
    const token = params.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!uidb64 || !token) {
            setError("Invalid password reset link");
            return;
        }
        if (password.length < 8) {
            setError("Password must contain at least 8 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);

        try {
            const response = await passwordResetService.confirmResetPassword(uidb64, token, password);
            setMessage("Password reset successfully");
            setTimeout(() => navigate("/login?success=password_reset"), 2000);

        } catch (err) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }   
    };

    return (
        <section className="flex flex-col items-center my-10">
            <h2 className="md:text-6xl text-5xl font-extrabold">Reset Password</h2>

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
                        type="password"
                        id="password"
                        value={password}
                        className="text-light-purple text-center mt-1 block w-full px-4 py-2 border-2 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="New password"
                        disabled={loading}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        className="text-light-purple text-center mt-1 block w-full px-4 py-2 border-2 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                        disabled={loading}
                    />
                </div>

                <div className="text-base font-normal flex justify-center">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </motion.button>
                </div>
            </form>
        </section>
    );
};

export default ResetPassword;