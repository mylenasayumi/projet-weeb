// ArticlesSection.jsx
// Section to display articles.
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import articleService from "../../services/ArticlesService";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import { useLanguage } from "../../languages/LanguageContext";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";
import ArticleFilters from "./ArticleFilters";
import Pagination from "./Pagination";
import { useAuth } from "../../contexts/AuthContext";

function ArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("title");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await articleService.getAll({
        page,
        ordering,
        search,
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
  const handleSearchSubmit = () => {
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
        } catch (err) {
          console.error(t("articles.loadingArticlesAuthorError"), err);
        }
      }

      setSelectedArticle({ ...fullArticle, author });
    } catch (err) {
      console.error(t("articles.loadingArticlesDetailsError"), err);
      setError(t("articles.loadingArticlesDetailsError"));
    }
  };

  // Handles navigation to create article page
  const handleCreateArticle = () => {
    if (!isAuthenticated) {
      setMessage(t("articles.loggedInCreateArticleError"));
      return;
    }
    navigate("/articles/create");
  };

  // Handles navigation to update article page
  const handleUpdateArticle = (article) => {
    navigate(`/articles/update/${article.id}`);
  };

  // Handles article deletion
  const handleDeleteArticle = async (id) => {
    if (!window.confirm(t("articles.confirmDeleteArticle"))) {
      return;
    }

    try {
      await articleService.delete(id);
      setSelectedArticle(null);
      await loadArticles();
      setMessage(t("articles.deleteArticleSuccess"));
    } catch (err) {
      console.error(t("articles.deleteArticleError"), err);
      console.error(
        t("articles.deleteArticleErrorResponse"),
        err.response?.data
      );

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

  if (loading)
    return (
      <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">
        {t("articles.loadingArticles")}
      </p>
    );
  if (error)
    return (
      <p className="bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">
        {error}
      </p>
    );

  return (
    <section className="p-8">
      <h2 className="flex items-center justify-center font-bold text-light-white text-[40px]">
        {t("articles.articlesPage")}
      </h2>

      {/* Warning message if user is not authenticated */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-red-100 text-red-700 text-xl border-2 border-red-400 rounded-[8px] px-6 py-3 text-center flex items-center gap-3"
        >
          <PiWarningFill size={22} />
          <p>{message}</p>
        </motion.div>
      )}

      <ArticleFilters
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={handleSearchSubmit}
        onOrderingChange={setOrdering}
      />

      {/* Articles grid */}
      <AnimatePresence>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap max-w-[1440px] w-full gap-10 justify-center mt-10">
            {/* Display existing articles details */}
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={handleOpenArticle}
              />
            ))}
            {/* Add new article (if user is authenticated) */}
            <ArticleCard
              isAddCard
              isAuthenticated={isAuthenticated}
              onCreate={handleCreateArticle}
            />
          </div>
        </div>
      </AnimatePresence>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />

      {/* Modal for article details */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            currentUser={user}
            onClose={() => setSelectedArticle(null)}
            onUpdate={handleUpdateArticle}
            onDelete={handleDeleteArticle}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ArticlesSection;
