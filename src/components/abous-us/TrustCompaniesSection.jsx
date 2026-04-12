// TrustCompaniesSection.jsx
import { motion } from "framer-motion";

function TrustCompaniesSection() {
    return (
        <section className="flex flex-col justify-between items-center my-10">
            <h2 className="text-6xl font-extrabold my-12 mb-20 text-center">They trust us</h2>
            <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-1 place-items-center gap-9 mx-14 mb-20">
                <motion.img 
                    src="src/assets/Logo-SmartFinder.png"
                    className="w-[176.16px] h-[32px] drop-shadow-2xl"
                    alt="Logo-SmartFinder"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                ></motion.img>
               <motion.img 
                    src="src/assets/Logo-Zoomer.png"
                    className="w-[133px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Zoomer"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                ></motion.img>
                <motion.img 
                    src="src/assets/Logo-Shells.png"
                    className="w-[124.4px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Shells"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                ></motion.img>
                <motion.img 
                    src="src/assets/Logo-Waves.png"
                    className="w-[109.03px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Waves"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                ></motion.img>
                <motion.img 
                    src="src/assets/Logo-ArtVenue.png"
                    className="w-[165.81px] h-[32px] drop-shadow-2xl"
                    alt="Logo-ArtVenue"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                ></motion.img>
            </div>
        </section>
    );
}

export default TrustCompaniesSection;