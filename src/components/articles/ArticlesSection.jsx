// ArticlesSection.jsx
// Section to display articles.
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import articleService from "../../services/ArticlesService";
import { TfiArrowCircleLeft, TfiArrowCircleRight  } from "react-icons/tfi";
import { PiMagnifyingGlass } from "react-icons/pi";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";


function ArticlesSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newArticle, setNewArticle] = useState("");
    const [page, setPage] = useState(1);
    const [ordering, setOrdering] = useState("title");
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await articleService.getAll({
                page,
                ordering,
                search
            });

            setArticles(data.results);
            setTotalPages(Math.ceil(data.count / 5)); // PAGE_SIZE = 5

        } catch (err) {
            console.error(err);
            setError("Error loading articles");
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        const delay = setTimeout(() => {
            loadArticles();
        }, 500);
        return () => clearTimeout(delay);
    }, [page, ordering]);

    useEffect(() => {
        if (search === "" || search.trim() === "") {
            setPage(1);
            loadArticles();
        }
    }, [search]);

    const handleAddArticle = async () => {
        try {
            const createdArticle = await articleService.create({ 
                title: newArticle,
            });
            setArticles((prev) => [...prev, createdArticle]);
            setNewArticle("");
        } catch (err) {
            console.error(err);
            setError("Error adding article");
        }
    };

    const handleSearch = () => {
        setPage(1); // Reset to first page when searching
        loadArticles();
    };

    if (loading) return <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">Loading articles...</p>;
    if (error) return <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">{error}</p>;

    return (
        <section className="p-8">
            <h2 className="flex items-center justify-center font-bold text-light-white text-[40px]">Découvir les articles</h2>
            
            {/* Search field (filter) */}
            <div className="flex items-center justify-center w-full mt-4">
                <div className="relative w-[300px] mt-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par titre"
                        className="border border-gray-300 px-4 py-2 pr-10 rounded-lg w-[300px] shadow-sm"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <motion.button
                        // className="border-2 border-gray-300 px-4 py-2 rounded-r-[8px] hover: cursor-pointer"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
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
                <span className="text-gray font-medium mb-2 sm:mb-0 sm:mr-2 text-center sm:text-left">Trier par :</span>
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded"
                        onClick={() => setOrdering("title")}
                    >
                        <BsSortAlphaDown size={25} />
                    </button>
                    <button
                        className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded"
                        onClick={() => setOrdering("-title")}
                    >
                        <BsSortAlphaDownAlt size={25} />
                    </button>
                </div>
            </div>

            {/* Add Article Form */}
            <div className="flex items-center justify-center w-full">
                <input
                    type="text"
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                    placeholder="Titre de l'article"
                    className="border-2 border-gray-300 rounded-[8px] px-4 py-2 m-8 w-[300px]"
                />
                <motion.button
                    className="bg-purple m-8 px-4 py-4 rounded-[8px] hover:bg-light-purple cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleAddArticle}
                >
                    Ajouter un article
                </motion.button>
            </div>
            
            <AnimatePresence>
                <div className="flex items-center justify-center w-full mx-16">
                    <div className="flex flex-wrap max-w-[1440px] w-full">
                        {articles.map((article) => (
                            <motion.div
                                key={article.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-[400px] h-[262px] bg-light-purple/6 border-2 border-purple p-2 rounded-2xl mx-4 mt-2 mb-8 shadow-lg" //m-4 fica torto, pq?
                            >
                                <h3 className="font-semibold text-xl text-light-purple p-6">{article.title}</h3>
                                <p className="font-normal text-gray text-base px-6">{article.body || "No content"}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                >
                    <TfiArrowCircleLeft size={25} />
                </button>
                <span className="mx-6">Page {page} / {totalPages}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                >
                    <TfiArrowCircleRight size={25}/>
                </button>
            </div>
        </section>
    );
}
  
export default ArticlesSection;