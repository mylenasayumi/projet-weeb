// SectionSeConnecter.jsx
import { motion } from "framer-motion";

function SectionSeConnecter() {
    return (
        <section className="flex flex-col items-center my-10">
            <h1 className="md:text-7xl text-5xl font-extrabold">Se connecter</h1>

            <form className="p-8 w-full max-w-md space-y-8">

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

                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="text-light-purple text-center placeholder:text-center mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="text-base font-normal flex justify-center">
                    <motion.button
                        type="submit"
                        className="bg-purple text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Se connecter
                    </motion.button>
                </div>
            </form>

            <a href="#mot-de-passe-oublie" className="hover:text-light-purple">Mot de passe oublié ?</a>

            <p className="text-light-gray my-10 mx-10 text-center">
                Vous n’avez pas de compte ? Vous pouvez en 
                <a href="/inscription" className="text-white hover:text-light-purple"> créer un</a>
            </p>
        </section>
    );
}


export default SectionSeConnecter;