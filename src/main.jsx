// C’est le point d’entrée JavaScript de votre application React. 
// Ce fichier importe React, ReactDOM et le composant <App />, 
// puis le monte dans la balise <div> ayant l'identifiant root du 
// fichier index.html. C’est également ici que vous pourriez ajouter 
// des outils globaux, comme un provider de contexte, une configuration 
// de router ou une intégration de bibliothèque tierce, selon les besoins de votre application.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
