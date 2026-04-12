// CreateArticle.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import articleService from "../services/ArticlesService";
import { motion } from "framer-motion";
import authTokenService from "../services/AuthTokenService";

function CreateArticle() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    
    // Checks authentication when component is loaded
    useEffect(() => {
        const checkAuth = authTokenService.isAuthenticated();
        setIsAuthenticated(checkAuth);
        
        if (!checkAuth) {
            setError("You must be logged in to create an article.");
            
            // Redirects to the login page after 2 seconds
            setTimeout(() => navigate("/login"), 2000);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Checks if the user is authenticated
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("You must be logged in to create an article.");
                return;
            }
            await articleService.create(formData);

            setMessage("Article created successfully! Redirecting...");
            setError("");
            setTimeout(() => navigate("/articles"), 3000);

        } catch (err) {
            console.error(err);
            setError("Error creating article");
            setMessage("");
        }
    };

    return (
        <section className="bg-dark-blue text-white max-w-3xl mx-auto p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white text-center text-[40px]">Create a new article</h1>       
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        placeholder="Description"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={6}
                        required
                    />
                </div>
                <motion.button
                    type="submit"
                    className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Create
                </motion.button>
            </form>
        </section>
    );
}

export default CreateArticle;