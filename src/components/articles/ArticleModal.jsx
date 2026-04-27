// src/components/articles/ArticleModal.jsx
// Modal for article details
import { motion } from "framer-motion";
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
      className="bg-black/50 fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal on background click
    >
      <motion.div
        className="bg-white rounded-[8px] p-6 max-w-lg w-full relative shadow-xl max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={20} />
        </button>

        <h2 className="text-2xl text-purple font-bold mb-4">{article.title}</h2>
        <div className="text-gray-500 mb-10">
          <p>
            <strong>{t("articles.author")}</strong>
            {authorName || "Unknown"}
          </p>
        </div>
        <p className="text-gray-700 whitespace-pre-line text-justify break-words">
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
      </motion.div>
    </motion.div>
  );
}

export default ArticleModal;
