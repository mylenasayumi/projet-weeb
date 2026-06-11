// ArticleDetail.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BsEye, BsHeart, BsHeartFill, BsArrowLeft } from "react-icons/bs";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../languages/LanguageContext";
import articleService from "../services/ArticlesService";
import authService from "../services/AuthService";
import likesService from "../services/LikesService";

function ArticleDetail() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Likes state
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [likeMessage, setLikeMessage] = useState("");

  // Loads article details
  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getById(id);
        setArticle(data);
        setLikesCount(data.likes_count ?? 0);
        setError(null);

        if (data?.user) {
          try {
            const authorData = await authService.getById(data.user);
            setAuthor(authorData);
          } catch (err) {
            console.error(err);
          }
        }
      } catch {
        setError(t("articles.loadingArticlesDetailsError"));
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id, t]);

  // Loads like status
  useEffect(() => {
    if (!user?.id) {
      setIsLiked(false);
      return;
    }
    const loadLikeStatus = async () => {
      try {
        const likes = await likesService.getAll();
        setIsLiked(likes.some((like) => like.article.id === Number(id)));
      } catch (err) {
        console.error(err);
      }
    };
    loadLikeStatus();
  }, [user?.id, id]);

  // Cleans like message after 3 seconds
  useEffect(() => {
    if (!likeMessage) return;
    const timer = setTimeout(() => setLikeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [likeMessage]);

  // Toggle like
  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      setLikeMessage(t("likes.likeLoginRequired"));
      return;
    }
    if (!isLiked) {
      const heartId = Date.now();
      setFloatingHearts((prev) => [...prev, heartId]);
      setTimeout(
        () => setFloatingHearts((prev) => prev.filter((h) => h !== heartId)),
        700
      );
    }
    try {
      const result = await likesService.toggle(article.id);
      setIsLiked(result.liked);
      setLikesCount((prev) => prev + (result.liked ? 1 : -1));
    } catch (err) {
      console.error(err);
    }
  };

  const isOwner = Number(user?.id) === Number(article?.user);

  const authorName = author
    ? `${author.first_name || ""} ${author.last_name || ""}`.trim()
    : `User #${article?.user}`;

  const handleUpdateArticle = () => {
    navigate(`/articles/update/${article.id}`, { state: { article } });
  };

  const handleDeleteArticle = async () => {
    if (!window.confirm(t("articles.confirmDeleteArticle"))) return;
    try {
      await articleService.delete(article.id);
      navigate("/articles", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <p className="md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">
        {t("articles.loadingArticles")}
      </p>
    );

  if (error || !article)
    return (
      <div className="text-center pt-20 pb-60">
        <p className="md:text-5xl text-xl font-extrabold mb-6">{error}</p>
        <button
          onClick={() => navigate("/articles")}
          className="mt-6 bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer"
        >
          {t("articles.backToArticles")}
        </button>
      </div>
    );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      {/* Login Required Message */}
      <AnimatePresence>
        {likeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-red-100 text-red-700 text-xl border-2 border-red-400 rounded-[8px] px-6 py-3 flex items-center gap-3"
          >
            <PiWarningFill size={22} />
            <p>{likeMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Articles */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-purple dark:text-light-purple hover:text-purple cursor-pointer mb-8 transition-colors"
      >
        <BsArrowLeft />
        {t("articles.backToArticles")}
      </button>

      {/* Image */}
      {article.image && (
        <div className="relative rounded-2xl overflow-hidden h-64 mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold text-purple dark:text-light-purple mb-4">
        {article.title}
      </h1>

      {/* Author, views and likes */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <span>
          <strong>{t("articles.author")}</strong>
          {authorName}
        </span>
        <span className="flex items-center gap-1">
          <BsEye size={13} />
          {article.views ?? 0} {t("articles.views")}
        </span>

        {/* Like Button */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {floatingHearts.map((heartId) => (
              <motion.span
                key={heartId}
                className="absolute text-red-500 pointer-events-none text-xs"
                initial={{ opacity: 1, y: 0, x: "-50%" }}
                animate={{ opacity: 0, y: -30 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ left: "50%" }}
              >
                <BsHeartFill size={15} />
              </motion.span>
            ))}
          </AnimatePresence>

          <motion.button
            onClick={handleToggleLike}
            title={
              isAuthenticated ? t("likes.like") : t("likes.likeLoginRequired")
            }
            whileTap={{ scale: 1.6 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`flex items-center gap-1 text-sm transition-colors duration-200 hover:cursor-pointer
              ${isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"}
              ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <motion.span
              key={isLiked ? "filled" : "empty"}
              initial={{ scale: 0.6, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {isLiked ? <BsHeartFill size={15} /> : <BsHeart size={15} />}
            </motion.span>
            <span className="text-xs">{likesCount}</span>
          </motion.button>
        </div>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed whitespace-pre-line text-justify text-gray-700 dark:text-gray-300">
        {article.description || t("articles.noContent")}
      </p>

      {/* Owner Actions */}
      {isOwner && (
        <div className="mt-10 flex gap-4 border-t border-gray-300 dark:border-gray-700 pt-6">
          <button
            onClick={handleUpdateArticle}
            className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple transition-colors cursor-pointer"
          >
            {t("articles.edit")}
          </button>
          <button
            onClick={handleDeleteArticle}
            className="bg-red-500 text-white px-6 py-2 rounded-[8px] hover:bg-red-600 transition-colors cursor-pointer"
          >
            {t("articles.delete")}
          </button>
        </div>
      )}
    </motion.main>
  );
}

export default ArticleDetail;
