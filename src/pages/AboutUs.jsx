// AboutUs.jsx
// That's the "Home" page, the first one users see when they visit the site. It presents the platform and its benefits.

import ExploreTheWebSection from "../components/about-us/ExploreTheWebSection";
import LearnAndProgressSection from "../components/about-us/LearnAndProgressSection";
import StayInformedSection from "../components/about-us/StayInformedSection";
import TrustCompaniesSection from "../components/about-us/TrustCompaniesSection";
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
