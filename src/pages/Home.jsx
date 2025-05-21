// Home.jsx

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SectionApprenezEtProgressez from "../components/home/SectionApprenezEtProgressez";
import SectionEntreprisesConfiance from "../components/home/SectionEntreprisesConfiance";
import SectionExplorezLeWeb from "../components/home/SectionExplorezLeWeb";
import SectionRestezInforme from "../components/home/SectionRestezInforme";


function Home() {
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

export default Home;
