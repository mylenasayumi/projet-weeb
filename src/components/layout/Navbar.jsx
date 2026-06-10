// Navbar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../languages/LanguageContext";
import LanguageSwitcher from "../../languages/LanguageSwitcher";
import AnimatedDropdownDiv from "../ui/AnimatedDropdownDiv";
import UserDropdown from "../ui/UserDropdown";

const navClassDesktop = ({ isActive }) =>
  `transition-colors duration-150 hover:text-purple ${
    isActive ? "underline underline-offset-4" : ""
  }`;

const navClassMobile = ({ isActive }) =>
  `block transition-colors duration-150 hover:text-purple ${
    isActive ? "underline underline-offset-4" : ""
  }`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to open/close the menu.
  const navigate = useNavigate();
  const menuDropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const MotionLink = motion(Link);
  const MotionNavLink = motion(NavLink);
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  // Theme state (light/dark) - persists in localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav className="w-full py-4 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <div className="container max-w-screen-xl mx-auto px-10 md:px-20 mt-2">
          <div className="bg-white/5 dark:bg-gray-800 rounded-[20px] py-7 px-6 flex justify-between items-center shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-colors duration-300">
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Weeb "Logo" */}
              <Link to="/" className="font-bold text-3xl mr-10">
                weeb
              </Link>

              <div className="flex items-center space-x-4 md:hidden">
                {/* Theme Toggle - Mobile */}
                <motion.button
                  onClick={toggleTheme}
                  aria-label={
                    theme === "light"
                      ? t("navbar.switchToDarkMode")
                      : t("navbar.switchToLightMode")
                  }
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors hover:cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  {theme === "light" ? (
                    <IoSunny size={20} className="text-yellow-400" />
                  ) : (
                    <IoMoon size={20} className="text-purple" />
                  )}
                </motion.button>

                {/* Language Switcher dropdown menu */}
                <LanguageSwitcher />

                {/* Mobile Avatar */}
                {user && <UserDropdown user={user} onLogout={handleLogout} />}

                {/* Mobile Menu Button */}
                {/* The button is hidden for small and medium screens */}
                <motion.button
                  ref={menuButtonRef}
                  type="button"
                  aria-label={
                    isOpen ? t("navbar.closeMenu") : t("navbar.openMenu")
                  }
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <img
                    src="/images/Mobile-Menu-Button.png"
                    alt="Hamburger Menu Button"
                    className="h-[44px] w-[48px] cursor-pointer"
                  />
                </motion.button>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-between items-center w-full">
              {/* Navbar Links */}
              <ul className="flex space-x-8 text-base font-medium">
                <li>
                  <MotionNavLink to="/" end className={navClassDesktop}>
                    {t("navbar.aboutUs")}
                  </MotionNavLink>
                </li>
                <li>
                  <MotionNavLink to="/articles" className={navClassDesktop}>
                    {t("navbar.articles")}
                  </MotionNavLink>
                </li>
                <li>
                  <MotionNavLink to="/contact" className={navClassDesktop}>
                    {t("navbar.contact")}
                  </MotionNavLink>
                </li>
              </ul>

              {/* Login / Sign up / Controls */}
              <div className="text-base font-normal flex items-center space-x-8 relative">
                {/* Theme Toggle - Desktop */}
                <motion.button
                  onClick={toggleTheme}
                  aria-label={
                    theme === "light"
                      ? t("navbar.switchToDarkMode")
                      : t("navbar.switchToLightMode")
                  }
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors hover:cursor-pointer"
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {theme === "light" ? (
                    <IoSunny size={22} className="text-yellow-400" />
                  ) : (
                    <IoMoon size={22} className="text-purple" />
                  )}
                </motion.button>

                {/* Language Switcher dropdown menu */}
                <LanguageSwitcher />

                {/* Desktop Avatar */}
                {user ? (
                  <div className="hidden md:block">
                    <UserDropdown user={user} onLogout={handleLogout} />
                  </div>
                ) : (
                  <>
                    <MotionNavLink to="/login" className={navClassDesktop}>
                      {t("navbar.login")}
                    </MotionNavLink>
                    <MotionLink
                      to="/sign-up"
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ scale: 1.07 }}
                      className="bg-purple text-white text-base font-normal px-8 py-3 rounded-[8px] transition-colors duration-150 hover:bg-light-purple cursor-pointer"
                    >
                      {t("navbar.signUp")}
                    </MotionLink>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Drop-down menu - Mobile */}
          <AnimatePresence>
            {isOpen && (
              <AnimatedDropdownDiv
                id="mobile-menu"
                className="md:hidden bg-white/5 dark:bg-gray-800 rounded-[20px] mt-4 p-8 space-y-4"
                ref={menuDropdownRef}
              >
                <ul className="text-base font-medium space-y-4">
                  <li>
                    <MotionNavLink
                      to="/"
                      end
                      className={navClassMobile}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("navbar.aboutUs")}
                    </MotionNavLink>
                  </li>
                  <li>
                    <MotionNavLink
                      to="/articles"
                      className={navClassMobile}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("navbar.articles")}
                    </MotionNavLink>
                  </li>
                  <li>
                    <MotionNavLink
                      to="/contact"
                      className={navClassMobile}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("navbar.contact")}
                    </MotionNavLink>
                  </li>
                  {!user && (
                    <>
                      <li>
                        <MotionNavLink
                          to="/login"
                          className={navClassMobile}
                          onClick={() => setIsOpen(false)}
                        >
                          {t("navbar.login")}
                        </MotionNavLink>
                      </li>
                      <li>
                        <Link
                          to="/sign-up"
                          className="block text-light-purple font-bold hover:text-purple"
                          onClick={() => setIsOpen(false)}
                        >
                          {t("navbar.signUp")}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </AnimatedDropdownDiv>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
