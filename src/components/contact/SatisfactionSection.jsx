// SatisfactionSection.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import authTokenService from "../../services/AuthTokenService";
import { useNavigate } from "react-router-dom";
import satisfactionService from "../../services/SatisfactionService";

function SatisfactionSection() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        last_name: "",
        first_name: "",
        email: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [satisfaction, setSatisfaction] = useState({ type: "", text: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Checks authentication when component is loaded
    useEffect(() => {
        const checkAuth = authTokenService.isAuthenticated();
        setIsAuthenticated(checkAuth);
        
        if (!checkAuth) {
            setSatisfaction({
                type: "error",
                text: "You must be logged in to submit a review. Redirecting..."
            });
            
            // Redirects to the login page after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }, [navigate]);

    // Pre-fills the form with user data if available
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || ""
            }));
        }
    }, []);

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
        setSatisfaction({ type: "", text: "" });

        try {
            // Checks if the user is authenticated
            const token = localStorage.getItem('access_token');
            if (!token) {
                setSatisfaction({
                    type: "error",
                    text: "You must be logged in to submit a review."
                });
                setIsSubmitting(false);
                return;
            }

            // Sends the form data to the backend 
            const response = await satisfactionService.create(formData);

            // Resets the form after successful submission
            setFormData({
                last_name: "",
                first_name: "",
                email: "",
                description: ""
            });

            // Display message based on the ML model
            if (response.polarity) {
                setSatisfaction({
                    type: "success",
                    text: "We are pleased to hear that you had a positive experience! Thank you for sharing your thoughts with us!"
                });
            } else {
                setSatisfaction({
                    type: "error",
                    text: "We are sorry to hear that you had a negative experience. Your feedback will help us improve our services."
                });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            console.log("ERROR RESPONSE:", error.response?.data);

            setSatisfaction({
                type: "error",
                text: error.message || "Une erreur s'est produite. Veuillez réessayer."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col items-center text-center">
            <h1 className="md:text-6xl text-5xl font-extrabold m-10">Votre avis compte !</h1>
            <p className="text-lg font-normal m-2 text-center 2xl:mx-100 xl:mx-50 mx-20">Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>

            {/* Satisfaction */}
            {satisfaction.text && (
                <div className={`mt-4 p-4 rounded-lg ${
                    satisfaction.type === "success"
                        ? "bg-green-100 text-green-800 border-2 border-green-500"
                        : "bg-red-100 text-red-800 border-2 border-red-500"
                    }`}>
                    {satisfaction.text}
                </div>
            )}

            {/* Satisfaction Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-light-purple/10 border-2 border-purple p-8 rounded-2xl shadow-md w-full max-w-md space-y-10 m-16"
            >

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Last Name */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="Last Name"
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    {/* First Name */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="First Name"
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
                        {isSubmitting ? "Sending..." : "Submit"}
                    </motion.button>
                </div>

            </form>
        </section>
    );
}

export default SatisfactionSection;


