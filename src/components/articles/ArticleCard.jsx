import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BsArrowRight,
  BsFillPlusCircleFill,
  BsEye,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";

import { useLanguage } from "../../languages/LanguageContext";

function ArticleCard({
  article,
  isAddCard,
  isAuthenticated,
  onOpen,
  onCreate,
  likedArticleIds = [],
  onToggleLike,
}) {
  const { t } = useLanguage();
  const isLiked = likedArticleIds.includes(article?.id);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Handles floating herts when user likes the article
  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      const id = Date.now();
      setFloatingHearts((prev) => [...prev, id]);
      setTimeout(
        () => setFloatingHearts((prev) => prev.filter((h) => h !== id)),
        700
      );
    }
    onToggleLike(article.id);
  };

  // Add new article (if user is authenticated)
  if (isAddCard) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        onClick={onCreate}
        className={`w-[400px] h-[360px] border-2 p-2 rounded-2xl shadow-lg
                    ${
                      isAuthenticated
                        ? "bg-light-purple/6 border-purple hover:cursor-pointer"
                        : "bg-gray-300/6 border-gray-400 cursor-not-allowed"
                    }`}
      >
        <div className="flex items-center justify-center text-center h-full">
          <BsFillPlusCircleFill size={24} className="inline-block mr-2" />
          <span className="text-gray-300 text-xl font-bold">
            {t("articles.addArticle")}
          </span>
        </div>
      </motion.div>
    );
  }

  // Display existing articles
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      className="w-[400px] h-[360px] bg-light-purple/6 border-2 border-purple rounded-2xl shadow-lg flex flex-col overflow-hidden"
    >
      {/* Image with views badge superimposed */}
      {article.image && (
        <div className="relative h-[120px] flex-shrink-0 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient to smooth the image -> background transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          {/* Views badge on the image */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 border border-purple/50 rounded-full px-2 py-1 text-xs text-light-purple font-medium">
            <BsEye size={12} />
            {article.views ?? 0} {t("articles.views")}
          </div>
        </div>
      )}

      <div
        className={`px-7 pt-2 flex-grow overflow-hidden flex flex-col ${!article.image ? "mt-5" : ""}`}
      >
        <h3 className="mt-4 font-semibold text-base text-light-purple leading-snug line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="font-normal text-gray text-sm line-clamp-5 text-justify break-words leading-relaxed flex-grow">
          {article.description || t("articles.noContent")}
        </p>
      </div>

      {/* Footer: views with no image + like button + read more button */}
      <div className="px-7 pb-6 pt-3 flex items-center justify-between">
        {!article.image && (
          <div className="flex items-center gap-1 text-xs text-light-purple">
            <BsEye size={13} />
            {article.views ?? 0} {t("articles.views")}
          </div>
        )}
        <div
          className={`flex items-center gap-4 ${!article.image ? "" : "ml-auto"}`}
        >
          {/* Like button */}
          <div className="relative flex items-center">
            {/* Floating hearts */}
            <AnimatePresence>
              {floatingHearts.map((id) => (
                <motion.span
                  key={id}
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
              onClick={handleLikeClick}
              title={
                isAuthenticated
                  ? t("articles.like")
                  : t("articles.likeLoginRequired")
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
              <span className="text-xs">{article.likes_count ?? 0}</span>
            </motion.button>
          </div>
          {/* Read more button */}
          <button
            onClick={() => onOpen(article.id)}
            className="text-white hover:underline hover:cursor-pointer text-sm flex items-center gap-2"
          >
            <BsArrowRight className="inline-block" />
            {t("articles.readMore")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleCard;
