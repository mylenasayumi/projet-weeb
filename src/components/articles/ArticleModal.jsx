// src/components/articles/ArticleModal.jsx
// Modal for article preview
import { motion } from "framer-motion";
import { BsEye } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { useLanguage } from "../../languages/LanguageContext";

function ArticleModal({ article, currentUser, onClose, onUpdate, onDelete }) {
  const { t } = useLanguage();
  const isOwner = Number(currentUser?.id) === Number(article?.user);
  const authorName = article.author
    ? `${article.author.first_name || ""} ${article.author.last_name || ""}`.trim()
    : `User #${article.user}`;

  return (
    <motion.div
      className="bg-black/50 dark:bg-black/60 fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal on background click
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-[8px] max-w-lg w-full relative shadow-xl max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Image */}
        {article.image && (
          <div className="relative h-[200px] w-full overflow-hidden rounded-t-[8px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        )}

        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <IoClose size={20} />
          </button>

          <h2 className="text-2xl text-purple dark:text-light-purple font-bold mb-4">
            {article.title}
          </h2>
          <div className="text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between">
            <p>
              <strong>{t("articles.author")}</strong>
              {authorName || "Unknown"}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <BsEye size={13} />
              {article.views ?? 0} {t("articles.views")}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line text-justify break-words">
            {article.description || t("articles.noContent")}
          </p>

          {/* Edit and Delete buttons for article owner */}
          {isOwner && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => onUpdate(article)}
                className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300"
              >
                {t("articles.edit")}
              </button>
              <button
                onClick={() => onDelete(article.id)}
                className="bg-red-500 text-white px-6 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer transition-colors duration-300"
              >
                {t("articles.delete")}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ArticleModal;
