// src/components/articles/Pagination.jsx
// Component responsible for articles pagination
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useLanguage } from "../../languages/LanguageContext";

function Pagination({ page, totalPages, onPrevious, onNext }) {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        className="hover:cursor-pointer disabled:opacity-40"
        onClick={onPrevious}
        disabled={page === 1}
      >
        <TfiArrowCircleLeft size={25} />
      </button>
      <span className="mx-6">
        {t("articles.pagination")} {page} / {totalPages}
      </span>
      <button
        className="hover:cursor-pointer disabled:opacity-40"
        onClick={onNext}
        disabled={page === totalPages}
      >
        <TfiArrowCircleRight size={25} />
      </button>
    </div>
  );
}

export default Pagination;
