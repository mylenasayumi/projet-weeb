// This is the JavaScript entry point for the React application.
// This file imports React, ReactDOM, and the App component.
// The router is configured here.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import '@fontsource/roboto';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import App from './App.jsx';
import Articles from './pages/Articles.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import CreateArticle from './pages/CreateArticle.jsx';
import UpdateArticle from './pages/UpdateArticle.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ErrorLayout from './pages/ErrorLayout.jsx';

// Configuring routes with createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Root route
    element: <App />, // Root component
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true, // Default route
        path: "/",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
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
        path: "articles",
        element: <Articles />,
      },
      {
        path: "articles/create",
        element: <CreateArticle />,
      },
      {
        path: "articles/update/:id",
        element: <UpdateArticle />,
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
    ],
  },
]);


// Integrating RouterProvider into the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
