// Profile.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "../components/users/profile/ProfileSection";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../languages/LanguageContext";
import articleService from "../services/ArticlesService";

const PAGE_SIZE = 5;

function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myArticles, setMyArticles] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Cleans message after 3 seconds
  useEffect(() => {
    if (!message.text) return;
    const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Search all articles and filter those from the logged-in user.
  const loadMyArticles = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      // Uses the ?user=id filter that already exists in the backend (a single request)
      const data = await articleService.getAll({ user: user.id, page });
      setMyArticles(data.results || []);
      setTotalPages(Math.max(1, Math.ceil((data.count || 0) / PAGE_SIZE)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, page]);

  useEffect(() => {
    loadMyArticles();
  }, [loadMyArticles]);

  // Handles article visualisation
  const handleViewArticle = (article) => {
    navigate(`/articles/${article.id}`);
  };

  // Handles article creation
  const handleCreateArticle = async (formData) => {
    try {
      await articleService.create(formData);
      setMessage({
        type: "success",
        text: t("articles.createArticleSuccess")
          .replace(" Redirecting...", "")
          .replace(" Redirection...", ""),
      });
      await loadMyArticles(); // Reloads articles after creation
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: t("articles.createArticleError") });
    }
  };
  // Handles navigation to update article page
  const handleUpdateArticle = (article) => {
    if (!article) {
      navigate("/articles/create");
      return;
    }
    navigate(`/articles/update/${article.id}`, { state: { article } });
  };

  // Handles article deletion
  const handleDeleteArticle = async (id) => {
    if (!window.confirm(t("articles.confirmDeleteArticle"))) {
      return;
    }

    try {
      await articleService.delete(id);
      // If the page is empty after deleting, go back one page.
      const isLastItemOnPage = myArticles.length === 1 && page > 1;
      if (isLastItemOnPage) {
        setPage((prev) => Math.max(1, prev - 1));
      } else {
        // Otherwise, just reload the current page.
        await loadMyArticles();
      }
      setMessage({ type: "success", text: t("articles.deleteArticleSuccess") });
    } catch (err) {
      console.error(t("articles.deleteArticleError"), err);
      console.error(
        t("articles.deleteArticleErrorResponse"),
        err.response?.data
      );

      if (err.response?.status === 403) {
        setMessage({
          type: "error",
          text: t("articles.notOwnerDeleteArticleError"),
        });
      } else if (err.response?.status === 401) {
        setMessage({
          type: "error",
          text: t("articles.loggedInDeleteArticleError"),
        });
      } else if (err.response?.status === 500) {
        setMessage({
          type: "error",
          text: t("articles.deleteArticleServerError"),
        });
      } else {
        setMessage({ type: "error", text: t("articles.deleteArticleError") });
      }
    }
  };

  return (
    <>
      {message.text && (
        <div
          className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-[8px] border-2 text-sm font-medium shadow-2xl transition-all
            ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border-green-400"
                : "bg-red-100 text-red-700 border-red-400"
            }`}
        >
          {message.text}
        </div>
      )}

      <ProfileSection
        user={user}
        articles={myArticles}
        loading={loading}
        onView={handleViewArticle}
        onCreate={handleCreateArticle}
        onUpdate={handleUpdateArticle}
        onDelete={handleDeleteArticle}
        page={page}
        totalPages={totalPages}
        onPreviousPage={() => setPage((prev) => prev - 1)}
        onNextPage={() => setPage((prev) => prev + 1)}
      />
    </>
  );
}

export default Profile;
