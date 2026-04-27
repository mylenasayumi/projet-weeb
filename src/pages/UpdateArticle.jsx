// UpdateArticle.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import articleService from "../services/ArticlesService";
import { motion } from "framer-motion";
import authTokenService from "../services/AuthTokenService";
import { useLanguage } from "../languages/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

function UpdateArticle() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [articleOwnerId, setArticleOwnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError("");

      try {
        const article = await articleService.getById(id);

        setFormData({
          title: article.title || "",
          description: article.description || "",
        });

        setArticleOwnerId(article.user);
      } catch (err) {
        console.error(err);
        setError(t("articles.articleDataMissingError"));
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      setError(t("articles.articleDataMissingError"));
      setLoading(false);
      return;
    }

    loadArticle();
  }, [id, t]);

  useEffect(() => {
    if (!loading && articleOwnerId && user?.id && user.id !== articleOwnerId) {
      setError(t("articles.notOwnerUpdateArticleError"));
      setTimeout(() => navigate("/articles"), 2000);
    }
  }, [loading, articleOwnerId, user, navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) return;

    if (!window.confirm(t("articles.confirmUpdateArticle"))) {
      return;
    }

    setSaving(true);
    try {
      await articleService.update(id, formData);
      navigate("/articles");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError(t("articles.notOwnerUpdateArticleError"));
      } else if (err.response?.status === 401) {
        setError(t("articles.loggedInUpdateArticleError"));
        await logout?.();
        await authTokenService.logout();
        navigate("/login");
      } else {
        setError(t("articles.updateArticleError"));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="bg-dark-blue text-white text-center text-2xl font-bold py-20">
        {t("articles.loadingArticle")}
      </p>
    );
  }

  return (
    <section className="bg-dark-blue text-white max-w-3xl mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-white text-center text-[40px]">
        {t("articles.updateArticlePage")}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">
            {t("articles.updateArticleTitle")}
          </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            disabled={saving || !!error}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">
            {t("articles.updateArticleDescription")}
          </label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            disabled={saving || !!error}
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={6}
          />
        </div>
        <motion.button
          type="submit"
          className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          disabled={saving || !!error}
        >
          {saving
            ? t("articles.updateArticleSavingButton")
            : t("articles.updateArticleSaveButton")}
        </motion.button>
      </form>
    </section>
  );
}

export default UpdateArticle;
