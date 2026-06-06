// src/router.jsx
// The router is configured here.
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Articles from "./pages/Articles.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import Contact from "./pages/Contact.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import ErrorLayout from "./pages/ErrorLayout.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Login from "./pages/Login.jsx";
import NewsletterSubscription from "./pages/NewsletterSubscription.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SignUp from "./pages/SignUp.jsx";
import UpdateArticle from "./pages/UpdateArticle.jsx";

// Configuring routes with createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Root route
    element: <App />, // Root component
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true, // Default route
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "articles/create",
            element: <CreateArticle />,
          },
          {
            path: "articles/update/:id",
            element: <UpdateArticle />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "auth/callback",
        element: <AuthCallback />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "newsletter-subscription",
        element: <NewsletterSubscription />,
      },
    ],
  },
]);

export default router;
