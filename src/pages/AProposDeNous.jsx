// AProposDeNous.jsx

import Footer from "../components/Footer";
import SectionApprenezEtProgressez from "../components/a-propos-de-nous/SectionApprenezEtProgressez";
import SectionEntreprisesConfiance from "../components/a-propos-de-nous/SectionEntreprisesConfiance";
import SectionExplorezLeWeb from "../components/a-propos-de-nous/SectionExplorezLeWeb";
import SectionRestezInforme from "../components/a-propos-de-nous/SectionRestezInforme";
import Navbar from "../components/Navbar";

function AProposDeNous() {
    return (
        <div className="font-roboto bg-dark-blue text-white">
            {/* Header */}
            <Navbar />
            {/* Sections */}
            <SectionExplorezLeWeb />
            <SectionEntreprisesConfiance />
            <SectionApprenezEtProgressez />
            <SectionRestezInforme />
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AProposDeNous;
