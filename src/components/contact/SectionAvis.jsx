// SectionAvis.jsx

function SectionAvis() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl">Votre avis compte !</h1>
            <p>Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>

            <form className="bg-light-purple/10 border-2 border-purple p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">

                <div>
                    {/* <label for="nom" className="block text-sm font-medium text-light-purple">Nom</label> */}
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="text-light-purple mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom"
                        required
                    />
                </div>

                <div>
                    {/* <label for="prenom" className="block text-sm font-medium text-light-purple">Prénom</label> */}
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        className="text-light-purple mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Prénom"                        
                        required
                    />
                </div>

                <div>
                    {/* <label for="email" className="block text-sm font-medium text-light-purple">E-mail</label> */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="text-light-purple mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        required
                    />
                </div>

                <div>
                    {/* <label for="message" className="block text-sm font-medium text-light-purple">Message</label> */}
                    <textarea
                        id="message"
                        name="message"
                        rows="1" 
                        cols="50"
                        className="text-light-purple mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Message"
                        required
                    />
                </div>

                <div className="text-base font-normal flex items-center space-x-8">
                    <button 
                        type="submit"
                        className="bg-purple text-white text-base font-normal px-8 py-2 rounded-lg hover:bg-light-purple cursor-pointer transition duration-100"
                        >
                        Contact
                    </button>
                </div>
           
            </form>
        </section>
    );
}

export default SectionAvis;