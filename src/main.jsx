// C’est le point d’entrée JavaScript de votre application React. 
// Ce fichier importe React, ReactDOM et le composant <App />, 
// puis le monte dans la balise <div> ayant l'identifiant root du 
// fichier index.html. C’est également ici que vous pourriez ajouter 
// des outils globaux, comme un provider de contexte, une configuration 
// de router ou une intégration de bibliothèque tierce, selon les besoins de votre application.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import '@fontsource/roboto';
import AProposDeNous from './pages/AProposDeNous.jsx';
import Contact from './pages/Contact.jsx';
import SeConnecter from './pages/SeConnecter.jsx';
import PageErreur from './components/PageErreur.jsx';

// Configuration des routes avec createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Route racine
    errorElement: <PageErreur />, // Page d'erreur
    children: [
      {
        index: true, // Route par défaut
        path: "/",
        element: <AProposDeNous />, // Composant AProposDeNous
      },
      {
        path: "contact", // Route /contact
        element: <Contact />, // Composant Contact
      },
      {
        path: "se-connecter", // Route /se-connecter
        element: <SeConnecter />, // Composant SeConnecter
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
