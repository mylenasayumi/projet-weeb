// ProfileSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BsPencilSquare, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

import { useLanguage } from "../../../languages/LanguageContext";
import Pagination from "../../articles/Pagination";

function ProfileSection({
  user,
  articles,
  loading,
  onView,
  onCreate,
  onUpdate,
  onDelete,
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
}) {
  const { t } = useLanguage();
  // Manage form data for creating articles
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const userName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "-";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onCreate(formData);
      setFormData({ title: "", description: "", image: "" });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen max-w-2xl mx-auto p-12 my-10 shadow-2xl border dark:border-gray rounded-[18px]">
      {/* Avatar + user name */}
      <div className="flex items-center gap-6 mb-8">
        <div className="bg-purple text-white text-3xl font-bold w-20 h-20 flex items-center justify-center rounded-full flex-shrink-0 select-none">
          {user?.first_name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{userName}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-md mb-4 text-center mt-1">
            {user?.email || "-"}
          </p>
        </div>
      </div>

      {/* Create Article Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-purple text-white px-5 py-3 rounded-[8px] hover:bg-light-purple transition-colors duration-300 cursor-pointer text-sm"
        >
          <BsPencilSquare />
          {t("articles.createArticlePage")}
          {showForm ? <BsChevronUp size={12} /> : <BsChevronDown size={12} />}
        </button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-4 border-2 border-gray-200 dark:border-gray-700 rounded-[18px] p-6"
              >
                <div>
                  <label className="block font-semibold mb-2">
                    {t("articles.title")}
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder={t("articles.title")}
                    value={formData.title}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full border-b border-gray-300 px-4 py-2 bg-transparent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    {t("articles.description")}
                  </label>
                  <textarea
                    name="description"
                    placeholder={t("articles.description")}
                    value={formData.description}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full border-b border-gray-300 px-4 py-2 bg-transparent focus:outline-none"
                    rows={5}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    {t("articles.image")}
                  </label>
                  <input
                    name="image"
                    type="url"
                    placeholder={t("articles.imagePlaceholder")}
                    value={formData.image}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full border-b border-gray-300 px-4 py-2 bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="bg-purple text-white px-6 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving
                      ? t("articles.updateArticleSavingButton")
                      : t("articles.createArticleSaveButton")}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ title: "", description: "", image: "" });
                    }}
                    className="px-6 py-2 rounded-[8px] border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {t("articles.cancel")}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* My published articles */}
      <div>
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-3">
          {t("profile.myArticles")}
        </h2>

        {loading && (
          <p className="text-center text-2xl font-bold py-20">
            {t("articles.loadingArticles")}
          </p>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BsPencilSquare className="text-4xl mx-auto mb-4" />
            <p>{t("profile.noArticles")}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 border border-light-purple dark:border-light-purple rounded-2xl shadow-2xl p-5 flex gap-4 items-start"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  onClick={() => onView(article)}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3
                  onClick={() => onView(article)}
                  className="font-semibold text-light-purple dark:text-light-purple truncate cursor-pointer hover:underline"
                >
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => onUpdate(article)}
                    className="bg-purple text-white text-sm px-4 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer transition-colors duration-300"
                  >
                    {t("articles.edit")}
                  </button>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer transition-colors duration-300"
                  >
                    {t("articles.delete")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination (It only appears if there is more than one page) */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        )}
      </div>
    </section>
  );
}

export default ProfileSection;
