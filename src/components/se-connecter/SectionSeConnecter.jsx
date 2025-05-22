// SectionSeConnecter.jsx

function SectionSeConnecter() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl font-extrabold mt-10">Se connecter</h1>

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
                    <button 
                        type="submit"
                        className="bg-purple text-white text-base font-normal px-8 py-3 rounded-[8px] hover:bg-light-purple cursor-pointer transition duration-100"
                        >
                        Se connecter
                    </button>
                </div>
            </form>

            <a href="#mot-de-passe-oublie" className="hover:text-light-purple">Mot de passe oublié ?</a>

            <p className="text-light-gray my-10">
                Vous n’avez pas de compte ? Vous pouvez en 
                <a href="" className="text-white hover:text-light-purple"> créer un</a>
            </p>
        </section>
    );
}


export default SectionSeConnecter;