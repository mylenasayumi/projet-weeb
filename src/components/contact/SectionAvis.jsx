// SectionAvis.jsx

function SectionAvis() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl font-extrabold m-10">Votre avis compte !</h1>
            <p className="text-lg font-normal m-2">Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>

            <form className="bg-light-purple/10 border-2 border-purple p-8 rounded-2xl shadow-md w-full max-w-md space-y-10 m-16">
                <div className="flex flex-col sm:flex-row gap-6">
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

                <div className="text-base font-normal flex justify-center">
                    <button 
                        type="submit"
                        className="bg-purple text-white text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100"
                        >
                        Contact
                    </button>
                </div>
           
            </form>
        </section>
    );
}

export default SectionAvis;