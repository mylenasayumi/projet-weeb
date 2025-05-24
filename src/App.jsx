// Il s’agit du composant principal de l’application. C’est à partir de ce fichier que vous allez 
// construire et organiser vos composants.

import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-roboto bg-dark-blue text-white">
        {/* Header */}
        <Navbar />
        {/* Sections */}
        <Outlet />
        {/* Footer */}
        <Footer />
    </div>
  );
}

export default App;