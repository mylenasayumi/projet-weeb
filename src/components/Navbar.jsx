// Navbar.jsx

import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import authTokenService from "../services/AuthTokenService";
import UserDropdown from "./users/UserDropdown";
import AnimatedDropdownDiv from "./ui/AnimatedDropdownDiv";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le menu, la valeur par défaut est false.
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const menuDropdownRef = useRef(null);
    const MotionLink = motion(Link);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
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
                            {/* "Logo" Weeb */}
                            <p className="font-bold text-3xl mr-10">weeb</p>
                            
                            <div className="flex items-center space-x-4 md:hidden">
                                {/* Avatar Mobile */}
                                {user && <UserDropdown user={user} onLogout={handleLogout} />}
                                
                                {/* Button Mobile */}
                                {/* Le bouton est masqué pour les écrans moyens et grands */}
                                <motion.button
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <img src="src/assets/Buttons-Group.png" alt="Bouton Menu Hamburger" className="h-[44px] w-[48px] cursor-pointer"></img>
                                </motion.button>
                            </div>
                        </div>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex justify-between items-center w-full">
                            {/* Liste Navbar */}
                            <ul className="flex space-x-8 text-base font-medium">
                                <li>
                                    <MotionLink
                                        to="/"
                                        whileHover={{ scale: 1.1 }}
                                        className="transition-colors duration-150 hover:text-purple"
                                    >        
                                        À propos de nous
                                    </MotionLink>
                                </li>
                                <li>
                                    <MotionLink
                                        to="/contact"
                                        whileHover={{ scale: 1.1 }}
                                        className="transition-colors duration-150 hover:text-purple"
                                    >        
                                        Contact
                                    </MotionLink>
                                </li>
                            </ul>

                            {/* Login / Sign up */}
                            <div className="text-base font-normal flex items-center space-x-8 relative">
                                {/* Avatar Desktop */}
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
                                            Se Connecter
                                        </MotionLink>
                                        <MotionLink
                                            to="/sign-in"
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] transition-colors duration-150 hover:bg-light-purple cursor-pointer"
                                        >        
                                            S'inscrire
                                        </MotionLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Menu déroulant - Mobile */}
                    <AnimatePresence>
                        {isOpen && (
                            <AnimatedDropdownDiv
                                className="md:hidden bg-white/5 rounded-[20px] mt-4 p-8 space-y-4"
                                ref={menuDropdownRef}
                            >
                                <ul className="text-base font-medium space-y-4">           
                                    <li>                            
                                        <Link to="/" className="block hover:text-purple" onClick={() => setIsOpen(false)}>À propos de nous</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="block hover:text-purple" onClick={() => setIsOpen(false)}>Contact</Link>
                                    </li>
                                    {!user && (
                                        <>
                                            <li>
                                                <Link to="/login" className="block hover:text-purple" onClick={() => setIsOpen(false)}>Se Connecter</Link>
                                            </li>
                                            <li>
                                                <Link to="/sign-in" className="block text-light-purple font-bold hover:text-purple" onClick={() => setIsOpen(false)}>S'inscrire</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                                {/* <div className="text-base font-normal space-y-3">                                
                                    <button className="bg-purple text-base font-normal px-4 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer">S'inscrire</button>
                                </div> */}
                            </AnimatedDropdownDiv>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;