// SectionAvis.jsx
import { motion } from "framer-motion";

function SectionAvis() {
    return (
        <section className="flex flex-col items-center text-center">
            <h1 className="md:text-7xl text-5xl font-extrabold m-10">Votre avis compte !</h1>
            <p className="text-lg font-normal m-2 text-center 2xl:mx-100 xl:mx-50 mx-20">Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>

            {/* Formulaire Avis */}
            <form className="bg-light-purple/10 border-2 border-purple p-8 rounded-2xl shadow-md w-full max-w-md space-y-10 m-16">
                
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Nom */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="Nom"
                            required
                        />
                    </div>
                    {/* Prénom */}
                    <div className="lg:w-1/2 md:w-1/2 sm:w-full">
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                            placeholder="Prénom"                        
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Email"
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <textarea
                        id="message"
                        name="message"
                        rows="1" 
                        cols="50"
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Message"
                        required
                    />
                </div>

                {/* Échelle de recommandation du site Weeb  */}
                <div className="text-light-purple space-y-4">
                    <p className="text-center">Sur une échelle de 1 à 10, recommanderiez-vous Weeb à un(e) ami(e) ?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((note) => (
                        <label key={note} className="flex flex-col items-center">
                            <input
                                type="radio"
                                name="recommandation"
                                value={note}
                                required
                            />
                            {note}
                        </label>
                        ))}
                    </div>
                </div>

                <div className="text-base font-normal flex justify-center">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact
                    </motion.button>
                </div>
           
            </form>
        </section>
    );
}

export default SectionAvis;


