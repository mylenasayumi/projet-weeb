// src/components/articles/ArticleFilters.jsx
import { motion } from "framer-motion";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useLanguage } from "../../languages/LanguageContext";

function ArticleFilters({
  search,
  onSearchChange,
  onSearchSubmit,
  onOrderingChange,
}) {
  const { t } = useLanguage();

  return (
    <>
      {/* Search field (filter) */}
      <div className="flex items-center justify-center w-full mt-4">
        <div className="relative w-[300px] mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("articles.searchByTitle")}
            className="border border-gray-300 px-4 py-2 pr-10 rounded-lg w-[300px] shadow-sm"
            onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
          />
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 hover: cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onSearchSubmit}
          >
            <PiMagnifyingGlass size={20} />
          </motion.button>
        </div>
      </div>

      {/* Ordering */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-end gap-2 sm:gap-4 mt-8 px-4 sm:px-16 max-w-[1440px] mx-auto">
        <span className="text-gray font-medium mb-2 sm:mb-0 sm:mr-2 text-center sm:text-left">
          {t("articles.orderby")}
        </span>
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded cursor-pointer"
            onClick={() => onOrderingChange("title")}
          >
            <BsSortAlphaDown size={25} />
          </button>
          <button
            className="flex items-center justify-center p-2 hover:bg-light-purple/20 rounded cursor-pointer"
            onClick={() => onOrderingChange("-title")}
          >
            <BsSortAlphaDownAlt size={25} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ArticleFilters;
