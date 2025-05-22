// Footer.jsx

import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="bg-white text-black text-base font-normal p-2">
            <div className="flex flex-col md:flex-row p-10 gap-10 items-start">
                <p className="font-bold text-3xl px-10">weeb</p>                            

                <div className="container max-w-screen-2xl mx-auto flex flex-col px-10 py-2 md:px-16 gap-6">
                        <p className="font-medium text-gray">PRODUIT</p>
                        <a href="#tarifs" className="hover:text-purple">Tarifs</a>
                        <a href="#apercu" className="hover:text-purple">Aperçu</a>
                        <a href="#parcourir" className="hover:text-purple">Parcourir</a>
                        <a href="#accessibilite" className="hover:text-purple">Accessibilité</a>
                        {/* <a href="#five" className="hover:text-purple">Five</a> */}
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col px-10 py-2 md:px-16 gap-6">
                        <p className="font-medium text-gray">SOLUTIONS</p>
                        <a href="#brainstorming" className="hover:text-purple">Brainstorming</a>
                        <a href="#generation-idees" className="hover:text-purple">Génération d'idées</a>
                        <a href="#maquettage" className="hover:text-purple">Maquettage</a>
                        <a href="#recherche" className="hover:text-purple">Recherche</a>
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col px-10 py-2 md:px-16 gap-6">
                        <p className="font-medium text-gray">RESSOURCES</p>
                        <a href="#centre-aide" className="hover:text-purple">Centre d’aide</a>
                        <a href="#blog" className="hover:text-purple">Blog</a>
                        <a href="#tutoriels" className="hover:text-purple">Tutoriels</a>
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col px-10 py-2 md:px-16 gap-6">
                        <p className="font-medium text-gray">ENTREPRISE</p>
                        <Link to="/a-propos-de-nous" className="hover:text-purple">À propos</Link>
                        <a href="#presse" className="hover:text-purple">Presse</a>
                        <a href="#evenements" className="hover:text-purple">Événements</a>
                        <a href="#carrieres" className="hover:text-purple">Carrières</a>
                </div>
            </div>
            <hr className="my-6 border-t-1 border-light-gray/50 m-10" />

            {/* bottom */}
            
            {/* <div className="flex justify-between items-center py-6 px-10"> */}
            <div className="flex flex-col md:flex-row md:justify-between p-10 gap-10 items-center md:items-start">
                <p>@ 2025 Weeb, Inc. Tous droits réservés.</p>
                <img 
                    src="src/assets/Social-Icons.png"
                    className="w-[184px] h-[24px] drop-shadow-2xl"
                    alt="Social-Icons"
                ></img>
            </div>
        </section>
    );
}

export default Footer;