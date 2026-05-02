// SignUpForm.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../../constants/api";
import { useLanguage } from "../../../languages/LanguageContext";
import authService from "../../../services/AuthService";

function SignUpForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      });
      // It does NOT log in automatically
      navigate("/login?success=account_created");
    } catch (err) {
      setError(err.message || t("signUp.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center my-10">
      <h1 className="md:text-6xl text-5xl font-extrabold">
        {t("signUp.title")}
      </h1>

      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md space-y-8">
        {/* Connection error displayed */}
        {error && (
          <div className="bg-red-100 border border-red-500 text-red-500 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
            placeholder={t("signUp.email")}
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
            placeholder={t("signUp.firstName")}
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
            placeholder={t("signUp.lastName")}
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
            placeholder={t("signUp.password")}
            required
            disabled={loading}
          />
        </div>

        <div className="text-base font-normal flex justify-center">
          <motion.button
            type="submit"
            className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            disabled={loading}
          >
            {loading
              ? t("signUp.registrationButton")
              : t("signUp.signUpButton")}
          </motion.button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center my-10 w-full max-w-md">
        <hr className="flex-grow border-t border-gray-500" />
        <span className="mx-4 text-gray-500">{t("signUp.orDivider")}</span>
        <hr className="flex-grow border-t border-gray-500" />
      </div>

      {/* Github OAuth */}
      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={() => {
            window.location.assign(`${API_BASE_URL}/api/auth/github/`);
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-700 text-white px-6 py-3 rounded-[8px] border-2 border-white hover:bg-gray-600 cursor-pointer"
        >
          {t("signUp.githubButton")}
        </motion.button>
      </div>
    </section>
  );
}

export default SignUpForm;
