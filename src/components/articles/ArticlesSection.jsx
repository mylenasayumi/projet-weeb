// ArticlesSection.jsx
// Section to display articles.
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import articleService from "../../services/ArticlesService";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { PiMagnifyingGlass, PiWarningFill } from "react-icons/pi";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsFillPlusCircleFill, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import authService from "../../services/AuthService";
import authTokenService from "../../services/AuthTokenService";
import { useLanguage } from "../../languages/LanguageContext";

function ArticlesSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [ordering, setOrdering] = useState("title");
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await articleService.getAll({
                page,
                ordering,
                search
            });

            setArticles(data.results || []);
            setTotalPages(Math.max(1, Math.ceil((data.count || 0) / 5))); // PAGE_SIZE = 5

        } catch (err) {
            console.error(err);
            setError(t("articles.loadingArticlesError"));
        } finally {
            setLoading(false);
        }
    };

    // Checks authentication
    useEffect(() => {
        const authenticated = authTokenService.isAuthenticated();
        setIsAuthenticated(authenticated);
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error parsing stored user:", err);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // Clears messages after 3 seconds
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
        
    }, [message]);
    
    // Loads articles when page, ordering or search changes
    useEffect(() => {
        const delay = setTimeout(() => loadArticles(), 300);
        return () => clearTimeout(delay);
    }, [page, ordering, search]);

    // Handles search action
    const handleSearch = () => {
        setPage(1); // Reset to first page when searching
    };

    // Handles opening article details
    const handleOpenArticle = async (id) => {
        try {
            const fullArticle = await articleService.getById(id);
            let author = null;

            if (fullArticle?.user) {
                try {
                    author = await authService.getById(fullArticle.user);
                } catch (authorErr) {
                    console.error(t("articles.loadingArticlesAuthorError"), authorErr);
                }
            }

            setSelectedArticle({ ...fullArticle, author });
            
        } catch (err) {
            console.error(t("articles.loadingArticlesDetailsError"), err);
            setError(t("articles.loadingArticlesDetailsError"));
        }
    };

    const isOwner = !!currentUser?.email && !!selectedArticle?.author?.email && currentUser.email === selectedArticle.author.email;

    // Handles navigation to update article page
    const handleUpdateArticle = (article) => {
        if (!article?.id) return;

        navigate(`/articles/update/${article.id}`, { 
            state: { 
                id: article.id, 
                title: article.title, 
                description: article.description,
                ownerEmail: article?.author?.email || null
            }
        });
    };


    // Handles article deletion
    const handleDeleteArticle = async (id) => {
        if (!isAuthenticated) {
            setMessage(t("articles.loggedInDeleteArticleError"));
            return;
        }

        if (!isOwner) {
            setMessage(t("articles.notOwnerDeleteArticleError"));
            return;
        }

        if (!window.confirm(t("articles.confirmDeleteArticle"))) {
            return;
        }

        try {
            await articleService.delete(id);
            setSelectedArticle(null);
            setArticles((prev) => prev.filter((article) => article.id !== id));
            setMessage(t("articles.deleteArticleSuccess"));
        } catch (err) {
            console.error(t("articles.deleteArticleError"), err);
            console.error(t("articles.deleteArticleErrorResponse"), err.response?.data);

            if (err.response?.status === 403) {
                setMessage(t("articles.notOwnerDeleteArticleError"));
            } else if (err.response?.status === 401) {
                setMessage(t("articles.loggedInDeleteArticleError"));
            } else if (err.response?.status === 500) {
                setMessage(t("articles.deleteArticleServerError"));
            } else {
                setMessage(t("articles.deleteArticleError"));
            }
        }
    };

    if (loading) return <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">{t("articles.loadingArticles")}</p>;
    if (error) return <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">{error}</p>;

    return (
        <section className="p-8">
            <h2 className="flex items-center justify-center font-bold text-light-white text-[40px]">{t("articles.articlesPage")}</h2>
            
            {/* Warning message if user is not authenticated */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-red-100 text-red-700 text-xl border-2 border-red-400 rounded-[8px] px-6 py-3 text-center flex items-center gap-3"
                >
                    <span><PiWarningFill size={22} /></span>
                    <p>{message}</p>
                </motion.div>
            )}

            {/* Search field (filter) */}
            <div className="flex items-center justify-center w-full mt-4">
                <div className="relative w-[300px] mt-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("articles.searchByTitle")}
                        className="border border-gray-300 px-4 py-2 pr-10 rounded-lg w-[300px] shadow-sm"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <motion.button
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover: cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleSearch}
                    >
                        <PiMagnifyingGlass size={20}/>
                    </motion.button>
                </div>
                
            </div>

            {/* Ordering */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-end gap-2 sm:gap-4 mt-8 px-4 sm:px-16 max-w-[1440px] mx-auto">
                <span className="text-gray font-medium mb-2 sm:mb-0 sm:mr-2 text-center sm:text-left">{t("articles.orderby")}</span>
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded cursor-pointer"
                        onClick={() => setOrdering("title")}
                    >
                        <BsSortAlphaDown size={25} />
                    </button>
                    <button
                        className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded cursor-pointer"
                        onClick={() => setOrdering("-title")}
                    >
                        <BsSortAlphaDownAlt size={25} />
                    </button>
                </div>
            </div>
            
            {/* Articles grid */}
            <AnimatePresence>
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-wrap max-w-[1440px] w-full gap-10 justify-center mt-10">

                        {/* Add new article (if user is authenticated) */}
                        {[...articles, { id: "add-card" }].map((article) => {
                            if (article.id === "add-card") {
                                return (
                                    <motion.div
                                        key="add-card"
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                setMessage(t("articles.loggedInCreateArticleError"));
                                            } else {
                                                navigate("/articles/create");
                                            }
                                        }}
                                        className={`w-[400px] h-[262px] border-2 p-2 rounded-2xl shadow-lg
                                            ${isAuthenticated
                                                ? "bg-light-purple/6 border-purple hover:cursor-pointer"
                                                : "bg-gray-300/6 border-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center text-center h-full">
                                            <p className="text-gray-300 text-xl font-bold">
                                                <BsFillPlusCircleFill size={24} className="inline-block mr-2" />
                                            </p>
                                            <span className="text-gray-300 text-xl font-bold">{t("articles.addArticle")}</span>
                                        </div>
                                    </motion.div>
                                );
                            }

                            // Display existing articles
                            return (
                                <motion.div
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-[400px] h-[262px] bg-light-purple/6 border-2 border-purple p-2 rounded-2xl shadow-lg flex flex-col"
                                >
                                    <h3 className="font-semibold text-xl text-light-purple p-6">{article.title}</h3>
                                    {/* <p className="font-normal text-gray text-base px-6 flex-grow overflow-hidden leading-relaxed max-h-[100px] relative text-justify"> */}
                                    <p className="font-normal text-gray text-base px-6 flex-grow line-clamp-3 text-justify break-words leading-relaxed">
                                        {article.description || "No content"}
                                    </p>
                                    <div className="px-6 py-4 flex justify-end">
                                        <button
                                            onClick={() => handleOpenArticle(article.id)}
                                            className="text-white hover:underline hover:cursor-pointer"
                                        >
                                            <BsArrowRight className="inline-block mr-2" />
                                            {t("articles.readMore")}
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    className="hover:cursor-pointer"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                >
                    <TfiArrowCircleLeft size={25} />
                </button>
                <span className="mx-6">{t("articles.pagination")} {page} / {totalPages}</span>
                <button
                    className="hover:cursor-pointer"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                >
                    <TfiArrowCircleRight size={25}/>
                </button>
            </div>

            {/* Modal for article details */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        className="bg-black/50 fixed inset-0 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedArticle(null)} // Close modal on background click
                    >
                        <motion.div
                            className="bg-white rounded-[8px] p-6 max-w-lg w-full relative shadow-xl max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <h2 className="text-2xl text-purple font-bold mb-4">{selectedArticle.title}</h2>
                            <div className="text-gray-500 mb-10">
                                <p>
                                    <strong>{t("articles.author")}</strong>{" "}
                                    {selectedArticle.author
                                        ? `${selectedArticle.author.first_name} ${selectedArticle.author.last_name}`.trim()
                                        : `User #${selectedArticle.user}`}
                                </p>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line text-justify break-words">
                                {selectedArticle.description || "No content"}
                            </p>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <IoClose size={20} />
                            </button>

                            {/* Edit and Delete buttons for article owner */}
                            {isOwner && (
                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={() => handleUpdateArticle(selectedArticle)}
                                        className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300"
                                    >
                                        {t("articles.edit")}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteArticle(selectedArticle.id)}
                                        className="bg-red-500 text-white px-6 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer transition-colors duration-300"
                                    >
                                        {t("articles.delete")}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
  
export default ArticlesSection;