// Login.jsx

import Footer from "../components/Footer";
import SectionSeConnecter from "../components/login/SectionSeConnecter";
import Navbar from "../components/Navbar";

function Login() {
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

export default Login;