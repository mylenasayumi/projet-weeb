// This is the main component of the application. From this file the components are built and organized.
import "./App.css";
import { Outlet } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <div className="font-roboto bg-white text-dark-blue dark:bg-dark-blue dark:text-white">
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
