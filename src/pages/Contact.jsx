// Contact.jsx

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionAvis from "../components/contact/SectionAvis";

function Contact() {
    return (
        <div className="font-roboto bg-dark-blue text-white">
            {/* Header */}
            <Navbar />
            {/* Sections */}
            <SectionAvis />
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Contact;