// C’est le point d’entrée JavaScript de l'application React. 
// Ce fichier importe React, ReactDOM et le composant <App />
// Ici le router est configuré
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import '@fontsource/roboto';
import AProposDeNous from './pages/AProposDeNous.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import PageErreur from './components/PageErreur.jsx';
import App from './App.jsx';
import Articles from './pages/Articles.jsx';

// Configuration des routes avec createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Route racine
    element: <App />, // Composant racine
    errorElement: <PageErreur />,
    children: [
      {
        index: true, // Route par défaut
        path: "/",
        element: <AProposDeNous />,
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
    ],
  },
]);


// Intégration de RouterProvider dans l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
