// This is the main component of the application. From this file the components are built and organized.
import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "logout_event") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <div className="font-roboto bg-dark-blue text-white">
      {/* Scroll to top */}
      <ScrollToTop />
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