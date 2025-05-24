// SectionApprenezEtProgressez.jsx
import { motion } from "framer-motion";

function SectionApprenezEtProgressez() {
    return (
        <section className="my-20 p-2">
            <div className="container max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-8 md:px-16 gap-12">
                <div className="flex-1 space-y-6">
                    <p className="text-xl font-bold">DES RESSOURCES POUR TOUS LES NIVEAUX</p>
                    <h1 className="text-light-purple md:text-7xl text-5xl font-extrabold">Apprenez <span className="text-white">et</span> progressez</h1>
                    <p className="text-lg font-normal">Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.</p>
                    <div className="flex items-center space-x-8">
                        <motion.button
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-medium py-2 hover:text-light-purple cursor-pointer"
                        >
                            Explorer les ressources →
                        </motion.button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <motion.img
                        src="src/assets/Desktop-App.png"
                        alt="Image d'un écran Desktop"
                        className="w-full max-w-[632px] h-[480px] h-auto drop-shadow-2xl" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                    ></motion.img>
                </div>
            </div>
        </section>
    );
}


export default SectionApprenezEtProgressez;

