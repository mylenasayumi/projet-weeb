// This is the JavaScript entry point for the React application.
// This file imports React, ReactDOM, and the App component.
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "@fontsource/roboto";
import { LanguageProvider } from "./languages/LanguageContext.jsx";
import router from "./router.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// Integrating RouterProvider into the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
