// AboutUs.jsx
// That's the "Home" page, the first one users see when they visit the site. It presents the platform and its benefits.

import LearnAndProgressSection from "../components/abous-us/LearnAndProgressSection";
import TrustCompaniesSection from "../components/abous-us/TrustCompaniesSection";
import ExploreTheWebSection from "../components/abous-us/ExploreTheWebSection";
import StayInformedSection from "../components/abous-us/StayInformedSection";
import ScrollToTop from "../components/ui/ScrollToTop";

function AboutUs() {
    return (
        <div>
            <ScrollToTop />
            {/* Sections */}
            <ExploreTheWebSection />
            <TrustCompaniesSection />
            <LearnAndProgressSection />
            <StayInformedSection />
        </div>
    );
}

export default AboutUs;
