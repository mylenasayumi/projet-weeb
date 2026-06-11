// Footer.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "../../languages/LanguageContext";

function Footer() {
  const MotionLink = motion(Link);
  const { t } = useLanguage();

  return (
    <section className="shadow-[0_0_40px_rgba(0,0,0,0.15)] border-t border-gray-200 bg-white text-dark-blue text-base font-normal p-2">
      <div className="flex flex-col lg:flex-row p-10 gap-10 lg:gap-4 items-start">
        {/* Weeb */}
        <div className="px-10">
          <p className="font-bold text-3xl">weeb</p>
        </div>

        {/* Grouped links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-6 gap-y-10 w-full max-w-screen-lg mx-auto px-10">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.product")}</p>
            <Link to="/prices" className="hover:text-purple">
              {t("footer.prices")}
            </Link>
            <Link to="/preview" className="hover:text-purple">
              {t("footer.preview")}
            </Link>
            <Link to="/browse" className="hover:text-purple">
              {t("footer.browse")}
            </Link>
            <Link to="/accessibility" className="hover:text-purple">
              {t("footer.accessibility")}
            </Link>
            <Link to="/five" className="hover:text-purple">
              {t("footer.five")}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.solutions")}</p>
            <Link to="/brainstorming" className="hover:text-purple">
              {t("footer.brainstorming")}
            </Link>
            <Link to="/idea-generation" className="hover:text-purple">
              {t("footer.ideaGeneration")}
            </Link>
            <Link to="/prototyping" className="hover:text-purple">
              {t("footer.prototyping")}
            </Link>
            <Link to="/research" className="hover:text-purple">
              {t("footer.research")}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.resources")}</p>
            <Link to="/help-center" className="hover:text-purple">
              {t("footer.helpCenter")}
            </Link>
            <Link to="/blog" className="hover:text-purple">
              {t("footer.blog")}
            </Link>
            <Link to="/tutorials" className="hover:text-purple">
              {t("footer.tutorials")}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.company")}</p>
            <Link to="/" className="hover:text-purple">
              {t("footer.aboutUs")}
            </Link>
            <Link to="/press" className="hover:text-purple">
              {t("footer.press")}
            </Link>
            <Link to="/events" className="hover:text-purple">
              {t("footer.events")}
            </Link>
            <Link to="/careers" className="hover:text-purple">
              {t("footer.careers")}
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-6 border-t-1 border-light-gray/50 m-10" />

      {/* Footer */}
      <div className="flex flex-col md:flex-row md:justify-between p-10 gap-10 items-center md:items-start text-center">
        <p>{t("footer.weebInc")}</p>
        <div className="flex gap-4">
          <MotionLink
            to="/youtube"
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src="/images/Youtube-Icon.png"
              alt="Youtube Icon"
              className="h-auto drop-shadow-2xl hover:cursor-pointer"
            ></img>
          </MotionLink>
          <MotionLink
            to="/facebook"
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src="/images/Facebook-Icon.png"
              alt="Facebook Icon"
              className="h-auto drop-shadow-2xl hover:cursor-pointer"
            ></img>
          </MotionLink>
          <MotionLink
            to="/twitter"
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src="/images/Twitter-Icon.png"
              alt="Twitter Icon"
              className="h-auto drop-shadow-2xl hover:cursor-pointer"
            ></img>
          </MotionLink>
          <MotionLink
            to="/instagram"
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src="/images/Instagram-Icon.png"
              alt="Instagram Icon"
              className="h-auto drop-shadow-2xl hover:cursor-pointer"
            ></img>
          </MotionLink>
          <MotionLink
            to="/linkedin"
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src="/images/Linkedin-Icon.png"
              alt="Linkedin Icon"
              className="h-auto drop-shadow-2xl hover:cursor-pointer"
            ></img>
          </MotionLink>
        </div>
      </div>
    </section>
  );
}

export default Footer;
