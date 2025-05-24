// AProposDeNous.jsx
// Ceci est la page Home

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionApprenezEtProgressez from "../components/a-propos-de-nous/SectionApprenezEtProgressez";
import SectionEntreprisesConfiance from "../components/a-propos-de-nous/SectionEntreprisesConfiance";
import SectionExplorezLeWeb from "../components/a-propos-de-nous/SectionExplorezLeWeb";
import SectionRestezInforme from "../components/a-propos-de-nous/SectionRestezInforme";

function AProposDeNous() {
    return (
        <div>
            {/* Sections */}
            <SectionExplorezLeWeb />
            <SectionEntreprisesConfiance />
            <SectionApprenezEtProgressez />
            <SectionRestezInforme />
        </div>
    );
}

export default AProposDeNous;
