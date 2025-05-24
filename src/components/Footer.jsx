// Footer.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
    return (
        <section className="bg-white text-black text-base font-normal p-2">
            <div className="flex flex-col lg:flex-row p-10 gap-10 lg:gap-4 items-start">
                {/* Logo Weeb */}
                <div className="px-10">
                    <p className="font-bold text-3xl">weeb</p>                            
                </div>

                {/* Les liens groupés */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-6 gap-y-10 w-full max-w-screen-lg mx-auto px-10">
                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">PRODUIT</p>
                            <a href="#tarifs" className="hover:text-purple">Tarifs</a>
                            <a href="#apercu" className="hover:text-purple">Aperçu</a>
                            <a href="#parcourir" className="hover:text-purple">Parcourir</a>
                            <a href="#accessibilite" className="hover:text-purple">Accessibilité</a>
                            <a href="#five" className="hover:text-purple">Five</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">SOLUTIONS</p>
                            <a href="#brainstorming" className="hover:text-purple">Brainstorming</a>
                            <a href="#generation-idees" className="hover:text-purple">Génération d'idées</a>
                            <a href="#maquettage" className="hover:text-purple">Maquettage</a>
                            <a href="#recherche" className="hover:text-purple">Recherche</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">RESSOURCES</p>
                            <a href="#centre-aide" className="hover:text-purple">Centre d’aide</a>
                            <a href="#blog" className="hover:text-purple">Blog</a>
                            <a href="#tutoriels" className="hover:text-purple">Tutoriels</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">ENTREPRISE</p>
                            <Link to="/" className="hover:text-purple">À propos</Link>
                            <a href="#presse" className="hover:text-purple">Presse</a>
                            <a href="#evenements" className="hover:text-purple">Événements</a>
                            <a href="#carrieres" className="hover:text-purple">Carrières</a>
                    </div>
                </div>
                
            </div>
            <hr className="my-6 border-t-1 border-light-gray/50 m-10" />

            {/* Pied de la page */}            
            <div className="flex flex-col md:flex-row md:justify-between p-10 gap-10 items-center md:items-start text-center">
                <p>@ 2025 Weeb, Inc. Tous droits réservés.</p>
                <motion.button
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <img 
                        src="src/assets/Social-Icons.png" 
                        alt="Icônes des médias sociaux" 
                        className="w-[184px] h-auto drop-shadow-2xl"
                    ></img>
                </motion.button>
            </div>
        </section>
    );
}

export default Footer;