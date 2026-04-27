// LoginSection.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { API_BASE_URL } from "../../../constants/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../languages/LanguageContext";

function LoginSection() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const success = params.get("success");
  const errorParam = params.get("error");

  const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "github_access_denied":
        return "github_access_denied";
      case "github_no_code":
        return "github_no_code";
      case "github_token_failed":
        return "github_token_failed";
      case "github_no_email":
        return "github_no_email";
      case "github_auth_failed":
        return "github_auth_failed";
      case "user_fetch_failed":
        return "user_fetch_failed";
      default:
        return errorCode || t("login.errorMessage");
    }
  };
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

    if (isAuthenticated) {
      navigate("/", { replace: true });
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      // Redirect to home and refresh to update UI
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || t("login.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || errorParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url);
    }
  }, [success, errorParam]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="flex flex-col items-center my-10">
      <h1 className="md:text-6xl text-5xl font-extrabold">
        {t("login.title")}
      </h1>

      {/* After creating an account, the user is redirected to the login page and a success message is displayed. */}
      {success === "account_created" && (
        <div className="bg-green-100 border border-green-500 text-green-500 px-4 py-3 rounded mt-4">
          {t("login.accountCreatedMessage")}
        </div>
      )}

      {/* After resetting the password, the user is redirected to the login page and a success message is displayed. */}
      {success === "password_reset" && (
        <div className="bg-green-100 border border-green-500 text-green-500 px-4 py-3 rounded mt-4">
          {t("login.passwordResetMessage")}
        </div>
      )}

      {errorParam && (
        <div className="bg-red-100 border border-red-500 text-red-500 px-4 py-3 rounded mt-4">
          {getAuthErrorMessage(errorParam)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md space-y-8">
        {/* Connection error displayed */}
        {error && (
          <div className="bg-red-100 border border-red-500 text-red-500 px-4 py-3 rounded mt-4">
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
            placeholder={t("login.email")}
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
            placeholder={t("login.password")}
            required
            disabled={loading}
          />
        </div>

        <div className="text-base font-normal flex justify-center">
          <motion.button
            type="submit"
            className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            disabled={loading}
          >
            {loading ? t("login.loggingIn") : t("login.loginButton")}
          </motion.button>
        </div>
      </form>

      <Link to="/forgot-password" className="hover:text-light-purple">
        {t("login.ForgotPasswordButton")}
      </Link>

      <p className="text-light-gray my-10 mx-10 text-center">
        {t("login.createAccountText")}
        <Link to="/sign-up" className="text-white hover:text-light-purple">
          {t("login.createAccountButton")}
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center my-10 w-full max-w-md">
        <hr className="flex-grow border-t border-gray-500" />
        <span className="mx-4 text-gray-500">{t("login.orDivider")}</span>
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
          {t("login.githubButton")}
        </motion.button>
      </div>
    </section>
  );
}

export default LoginSection;
