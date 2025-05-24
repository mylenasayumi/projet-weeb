// SectionRestezInforme.jsx
import { motion } from "framer-motion";

function SectionRestezInforme() {
    return (
        <section className="my-14 p-4">
            <div className="container max-w-screen-2xl mx-auto flex flex-col lg:flex-col xl:flex-row justify-between items-center p-10 px-15">

                <div className="flex-1 flex justify-center">
                    <motion.img
                        src="src/assets/Shapes.png"
                        className="w-[300px] sm:w-[350px] md:w-[415.82px] h-auto drop-shadow-2xl pr-0 xl:pr-10"

                        alt="Image de formes géométriques carrées"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, ease: "linear" }}
                    ></motion.img>
                </div>
                <div className="flex-1 space-y-6 mt-30 xl:mt-0">
                    <p className="text-xl font-bold">LE WEB, UN ÉCOSYSTÈME EN CONSTANT ÉVOLUTION</p>
                    <h1 className="md:text-7xl text-5xl font-extrabold">Restez informé des dernières <span className="text-light-purple">tendances</span></h1>
                    <p className="text-lg font-normal">Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !</p>
                    <div className="flex items-center space-x-8">
                        <motion.button
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-medium py-2 hover:text-light-purple cursor-pointer"
                        >
                            Lire les articles récents →
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionRestezInforme;