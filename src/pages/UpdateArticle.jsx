// UpdateArticle.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import articleService from "../services/ArticlesService";
import { motion } from "framer-motion";
import authTokenService from "../services/AuthTokenService";
import { useLanguage } from "../languages/LanguageContext";

function UpdateArticle() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: state?.title || "",
        description: state?.description || "",
    });
    const [error, setError] = useState("");
    const { t } = useLanguage();

    const storedUser = localStorage.getItem("user");
    let currentUser = null;

    try {
        currentUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
        console.error("Error parsing stored user:", err);
    }
    
    useEffect(() => {
        if (!state?.id) {
            setError(t("articles.articleDataMissingError"));
            setTimeout(() => navigate("/articles"), 2000);
            return;
        }

        if (!authTokenService.isAuthenticated()) {
            setError(t("articles.loggedInUpdateArticleError"));
            setTimeout(() => navigate("/login"), 2000);
            return;
        }

        if (state?.ownerEmail && currentUser?.email !== state.ownerEmail) {
            setError(t("articles.notOwnerUpdateArticleError"));
            setTimeout(() => navigate("/articles"), 2000);
        }
    }, [navigate, state, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error) return;

        if (!window.confirm(t("articles.confirmUpdateArticle"))) {
            return;
        }

        try {
            await articleService.update(state.id, formData);
            navigate("/articles");
        } catch (err) {
            console.error(err);
            if (err.response?.status === 403) {
                setError(t("articles.notOwnerUpdateArticleError"));
            } else if (err.response?.status === 401) {
                setError(t("articles.loggedInUpdateArticleError"));
                authTokenService.logout();
                navigate("/login");
            } else {
                setError(t("articles.updateArticleError"));
            }
        }
    };

    return (
        <section className="bg-dark-blue text-white max-w-3xl mx-auto p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white text-center text-[40px]">{t("articles.updateArticlePage")}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-2">{t("articles.updateArticleTitle")}</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">{t("articles.updateArticleDescription")}</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={6}
                    />
                </div>
                <motion.button
                    type="submit"
                    className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    disabled={!!error}
                >
                    {t("articles.updateArticleSaveButton")}
                </motion.button>
            </form>
        </section>
    );
}

export default UpdateArticle;