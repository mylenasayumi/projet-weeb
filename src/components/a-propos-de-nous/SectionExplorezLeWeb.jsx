// SectionExplorezLeWeb.jsx
import { motion } from "framer-motion";

function SectionExplorezLeWeb() {
    return (
        <section className="flex flex-col items-center">
            <h1 className="md:text-7xl text-5xl font-extrabold text-center my-18 mx-10 md:mx-20 lg:mx-30">Explorez le <span className="text-light-purple font-light">Web</span> sous toutes ses <span className="underline underline-offset-16 decoration-light-purple decoration-[5px]">facettes</span></h1>
            <p className="text-lg font-normal text-center 2xl:mx-100 xl:mx-50 lg:mx-30 mx-15">Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.</p>
            <div className="text-lg md:text-xl font-medium flex items-center m-6 my-10 space-x-8">
                <motion.button
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-purple px-4 py-4 rounded-[8px] hover:bg-light-purple cursor-pointer"
                >
                    Découvrir les articles
                </motion.button>
                <motion.button
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-3 rounded-[8px] border-2 hover:bg-light-purple cursor-pointer"
                >
                    S'abonner à la newsletter
                </motion.button>
            </div>
            <motion.img
                src="src/assets/Desktop-App.png"
                alt="Image d'un écran Desktop"
                className="w-full max-w-[1100px] h-auto drop-shadow-2xl mt-8 px-10 md:px-15"  
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
            ></motion.img>
        </section>
    );
}

export default SectionExplorezLeWeb;