// Navbar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import authTokenService from "../services/AuthTokenService";
import UserDropdown from "./ui/UserDropdown";
import AnimatedDropdownDiv from "./ui/AnimatedDropdownDiv";
import LanguageSwitcher from "../languages/LanguageSwitcher";
import { useLanguage } from "../languages/LanguageContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State to open/close the menu, the default value is false.
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const menuDropdownRef = useRef(null);
    const menuButtonRef = useRef(null);
    const MotionLink = motion(Link);
    const { t } = useLanguage();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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

    const handleLogout = () => {
        authTokenService.logout();
        localStorage.removeItem("user");
        setUser(null);
        setIsOpen(false);
        navigate("/login");
    };
    
    return (
        <header>
            <nav className="w-full py-4">
                <div className="container max-w-screen-xl mx-auto px-10 md:px-20 mt-2">
                    <div className="bg-white/5 rounded-[20px] py-7 px-6 flex justify-between items-center shadow-lg">
                        
                        <div className="flex items-center justify-between w-full md:w-auto">
                            {/* Weeb "Logo" */}
                            <p className="font-bold text-3xl mr-10">weeb</p>
                            
                            <div className="flex items-center space-x-4 md:hidden">
                                {/* Language Switcher dropdown menu */}
                                <LanguageSwitcher></LanguageSwitcher>
                                
                                {/* Mobile Avatar */}
                                {user && <UserDropdown user={user} onLogout={handleLogout} />}
                                
                                {/* Mobile Menu Button */}
                                {/* The button is hidden for small and medium screens */}
                                <motion.button
                                    ref={menuButtonRef}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <img src="src/assets/Mobile-Menu-Button.png" alt="Hamburger Menu Button" className="h-[44px] w-[48px] cursor-pointer"></img>
                                </motion.button>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex justify-between items-center w-full">
                            {/* Navbar Links */}
                            <ul className="flex space-x-8 text-base font-medium">
                                <li>
                                    <MotionLink
                                        to="/"
                                        whileHover={{ scale: 1.1 }}
                                        className="transition-colors duration-150 hover:text-purple"
                                    >        
                                        {t("navbar.aboutUs")}
                                    </MotionLink>
                                </li>
                                <li>
                                    <MotionLink
                                        to="/contact"
                                        whileHover={{ scale: 1.1 }}
                                        className="transition-colors duration-150 hover:text-purple"
                                    >        
                                        {t("navbar.contact")}
                                    </MotionLink>
                                </li>
                            </ul>

                            {/* Login / Sign up */}
                            <div className="text-base font-normal flex items-center space-x-8 relative">
                                
                                {/* Language Switcher dropdown menu */}
                                <LanguageSwitcher></LanguageSwitcher>
                                
                                {/* Desktop Avatar */}
                                {user ? (
                                    <div className="hidden md:block">
                                        <UserDropdown user={user} onLogout={handleLogout} />
                                    </div>
                                ) : (
                                    <>
                                        <MotionLink
                                            to="/login"
                                            whileHover={{ scale: 1.1 }}
                                            className="transition-colors duration-150 hover:text-purple"
                                        >        
                                            {t("navbar.login")}
                                        </MotionLink>
                                        <MotionLink
                                            to="/sign-up"
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] transition-colors duration-150 hover:bg-light-purple cursor-pointer"
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
                                className="md:hidden bg-white/5 rounded-[20px] mt-4 p-8 space-y-4"
                                ref={menuDropdownRef}
                            >
                                <ul className="text-base font-medium space-y-4">           
                                    <li>                            
                                        <Link to="/" className="block hover:text-purple" onClick={() => setIsOpen(false)}>{t("navbar.aboutUs")}</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="block hover:text-purple" onClick={() => setIsOpen(false)}>{t("navbar.contact")}</Link>
                                    </li>
                                    {!user && (
                                        <>
                                            <li>
                                                <Link to="/login" className="block hover:text-purple" onClick={() => setIsOpen(false)}>{t("navbar.login")}</Link>
                                            </li>
                                            <li>
                                                <Link to="/sign-up" className="block text-light-purple font-bold hover:text-purple" onClick={() => setIsOpen(false)}>{t("navbar.signUp")}</Link>
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