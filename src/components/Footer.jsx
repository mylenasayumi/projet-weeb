// Footer.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../languages/LanguageContext";

function Footer() {
  const MotionLink = motion(Link);
  const { t } = useLanguage();

  return (
    <section className="bg-white text-black text-base font-normal p-2">
      <div className="flex flex-col lg:flex-row p-10 gap-10 lg:gap-4 items-start">
        {/* Weeb  */}
        <div className="px-10">
          <p className="font-bold text-3xl">weeb</p>
        </div>

        {/* Grouped links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-6 gap-y-10 w-full max-w-screen-lg mx-auto px-10">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.product")}</p>
            <a href="/prices" className="hover:text-purple">
              {t("footer.prices")}
            </a>
            <a href="/preview" className="hover:text-purple">
              {t("footer.preview")}
            </a>
            <a href="/browse" className="hover:text-purple">
              {t("footer.browse")}
            </a>
            <a href="/accessibility" className="hover:text-purple">
              {t("footer.accessibility")}
            </a>
            <a href="/five" className="hover:text-purple">
              {t("footer.five")}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.solutions")}</p>
            <a href="/brainstorming" className="hover:text-purple">
              {t("footer.brainstorming")}
            </a>
            <a href="/idea-generation" className="hover:text-purple">
              {t("footer.ideaGeneration")}
            </a>
            <a href="/prototyping" className="hover:text-purple">
              {t("footer.prototyping")}
            </a>
            <a href="/research" className="hover:text-purple">
              {t("footer.research")}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.resources")}</p>
            <a href="/help-center" className="hover:text-purple">
              {t("footer.helpCenter")}
            </a>
            <a href="/blog" className="hover:text-purple">
              {t("footer.blog")}
            </a>
            <a href="/tutorials" className="hover:text-purple">
              {t("footer.tutorials")}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray">{t("footer.company")}</p>
            <Link to="/" className="hover:text-purple">
              {t("footer.aboutUs")}
            </Link>
            <a href="/press" className="hover:text-purple">
              {t("footer.press")}
            </a>
            <a href="/events" className="hover:text-purple">
              {t("footer.events")}
            </a>
            <a href="/careers" className="hover:text-purple">
              {t("footer.careers")}
            </a>
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
              src="src/assets/Youtube-Icon.png"
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
              src="src/assets/Facebook-Icon.png"
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
              src="src/assets/Twitter-Icon.png"
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
              src="src/assets/Instagram-Icon.png"
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
              src="src/assets/Linkedin-Icon.png"
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
