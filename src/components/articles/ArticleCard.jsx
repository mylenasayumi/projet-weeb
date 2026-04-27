import { motion } from "framer-motion";
import { BsArrowRight, BsFillPlusCircleFill } from "react-icons/bs";
import { useLanguage } from "../../languages/LanguageContext";

function ArticleCard({
  article,
  isAddCard,
  isAuthenticated,
  onOpen,
  onCreate,
}) {
  const { t } = useLanguage();

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
        className={`w-[400px] h-[262px] border-2 p-2 rounded-2xl shadow-lg
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
      className="w-[400px] h-[262px] bg-light-purple/6 border-2 border-purple p-2 rounded-2xl shadow-lg flex flex-col"
    >
      <h3 className="font-semibold text-xl text-light-purple p-6">
        {article.title}
      </h3>
      {/* <p className="font-normal text-gray text-base px-6 flex-grow overflow-hidden leading-relaxed max-h-[100px] relative text-justify"> */}
      <p className="font-normal text-gray text-base px-6 flex-grow line-clamp-3 text-justify break-words leading-relaxed">
        {article.description || t("articles.noContent")}
      </p>
      <div className="px-6 py-4 flex justify-end">
        <button
          onClick={() => onOpen(article.id)}
          className="text-white hover:underline hover:cursor-pointer"
        >
          <BsArrowRight className="inline-block mr-2" />
          {t("articles.readMore")}
        </button>
      </div>
    </motion.div>
  );
}

export default ArticleCard;
