// Navbar.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
    // État pour ouvrir/fermer le menu, la valeur par défaut est false.
    const [isOpen, setIsOpen] = useState(false);
    const MotionLink = motion(Link);
    
    return (
        <header>
            <nav className="w-full py-4">
                <div className="container max-w-screen-xl mx-auto px-10 md:px-20 mt-2">
                    <div className="bg-white/5 rounded-[20px] py-7 px-6 flex justify-between items-center shadow-lg">
                        
                        <div className="flex items-center justify-between w-full md:w-auto">
                            {/* "Logo" Weeb */}
                            <p className="font-bold text-3xl mr-10">weeb</p>
                            
                            {/* Button Mobile */}
                            {/* Le bouton est masqué pour les écrans moyens et grands */}
                            <motion.button
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                className="md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <img src="src/assets/Buttons-Group.png" alt="Bouton Menu Hamburger" className="h-[44px] w-[48px] cursor-pointer"></img>
                            </motion.button>
                        </div>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex justify-between items-center w-full">
                            {/* Liste Navbar */}
                            <ul className="flex space-x-8 text-base font-medium">
                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                >        
                                    <Link to="/" className="transition-colors duration-150 hover:text-purple">À propos</Link>
                                </motion.li>
                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                >        
                                    <Link to="/contact" className="transition-colors duration-150 hover:text-purple">Contact</Link>
                                </motion.li>
                            </ul>

                            {/* Se Connecter/S'inscrire */}
                            <div className="text-base font-normal flex items-center space-x-8">
                                <MotionLink
                                    whileHover={{ scale: 1.1 }}
                                >        
                                    <Link to="/se-connecter" className="transition-colors duration-150 hover:text-purple">Se Connecter</Link>
                                </MotionLink>
                                <motion.button
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] transition-colors duration-150 hover:bg-light-purple cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    S'inscrire
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    {/* Menu déroulant - Mobile */}
                    {isOpen && (
                        <div className="md:hidden bg-white/5 rounded-[20px] mt-4 p-8 space-y-4">
                            <ul className="text-base font-medium space-y-4">           
                                <li>                            
                                    <Link to="/" className="block hover:text-purple" onClick={() => setIsOpen(false)}>À propos de nous</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="block hover:text-purple" onClick={() => setIsOpen(false)}>Contact</Link>
                                </li>
                                <li>
                                    <Link to="/se-connecter" className="block hover:text-purple" onClick={() => setIsOpen(false)}>Se Connecter</Link>
                                </li>
                                <li>
                                    <Link to="/inscription" className="block text-light-purple font-bold hover:text-purple" onClick={() => setIsOpen(false)}>S'inscrire</Link>
                                </li>
                            </ul>
                            {/* <div className="text-base font-normal space-y-3">                                
                                <button className="bg-purple text-base font-normal px-4 py-2 rounded-[8px] hover:bg-light-purple cursor-pointer">S'inscrire</button>
                            </div> */}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;