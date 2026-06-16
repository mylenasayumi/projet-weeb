// ScrollToTopButton.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

import { useLanguage } from "../../languages/LanguageContext";

const SCROLL_THRESHOLD = 300;

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  // Show button after scrolling past threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label={t("navbar.scrollToTopButton")}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 z-40 bg-purple hover:bg-light-purple text-white rounded-full p-3 shadow-lg cursor-pointer transition-colors duration-200"
        >
          <BsChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
