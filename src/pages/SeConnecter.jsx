// SeConnecter.jsx

import SectionSeConnecter from "../components/se-connecter/SectionSeConnecter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SeConnecter() {
    return (
        <div className="font-roboto bg-dark-blue text-white">
            {/* Header */}
            <Navbar />
            {/* Sections */}
            <SectionSeConnecter />
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default SeConnecter;