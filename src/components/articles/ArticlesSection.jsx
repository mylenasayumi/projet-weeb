// ArticlesSection.jsx
// Section to display articles.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// The URL of Weeb backend API
const API_URL = "http://localhost:8000/api/articles/";

function ArticlesSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newArticle, setNewArticle] = useState("");

    // const fetchArticles = () => {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //       .then(response => response.json())
    //       .then((posts) => {
    //         // Mélange les posts et en sélectionne 3 au hasard
    //         const shuffled = posts.sort(() => 0.5 - Math.random());
    //         setArticles(shuffled.slice(0, 3));
    //       });
    //   };
    
    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error loading articles");
                setLoading(false);
            });
    }, []);

    const handleAddArticle = () => {
        axios
            .post(API_URL, { title: newArticle})
            .then((response) => {
                setArticles([...articles, response.data]);
                setNewArticle("");
            })
            .catch((err) => {
                setError("Error adding article");
                // alert("Erreur lors de l'ajout de la tâche");
            });
    };

    if (loading) return <p data-cy="loading-state">Loading...</p>;
    if (error) return <p data-cy="error-state">{error}</p>;

    return (
        <section className="inter bg-white">
            <h2 className="flex items-center justify-center font-bold text-black text-[40px] mt-8">Articles</h2>
            
            {/* Bouton de rechargement de articles */}
            <div className="flex items-center justify-center w-full">
                <motion.button
                    className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    disabled={loading}
                    onClick={fetchArticles}
                >
                    {loading ? "Chargement..." : "Générer de nouveaux articles"}
                    

                </motion.button>
            </div>
            
            <AnimatePresence>
                <div className="flex items-center justify-center w-full mx-16">
                    <div className="flex flex-wrap max-w-[1440px] w-full ">
                        {articles.map((article) => (
                            <motion.div
                                key={article.id}
                                layout
                                initial={{ opacity: 0, x: -20 }} //
                                animate={{ opacity: 1, x: 0 }} //
                                exit={{ opacity: 0, x: 20 }} //
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-[400px] h-[262px] rounded-lg mx-4 mt-2 mb-8 shadow-lg" //m-4 fica torto, pq?
                            >
                                <h3 className="font-semibold text-xl text-purple p-6">{article.title}</h3>
                                <p className="font-normal text-gray text-base px-6">{article.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatePresence>
        </section>
    );
}
  
export default ArticlesSection;