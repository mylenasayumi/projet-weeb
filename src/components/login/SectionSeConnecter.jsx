// SectionSeConnecter.jsx

function SectionSeConnecter() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl">Se connecter</h1>

            <form className="p-8 w-full max-w-md space-y-6">

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
                    {/* <label for="password" className="block text-sm font-medium text-light-purple">E-mail</label> */}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="text-light-purple mt-1 block w-full px-4 py-2 border-b-1 border-light-purple shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="text-base font-normal flex items-center space-x-8">
                    <button 
                        type="submit"
                        className="bg-purple text-white text-base font-normal px-8 py-2 rounded-lg hover:bg-light-purple cursor-pointer transition duration-100"
                        >
                        Se connecter
                    </button>
                </div>
            </form>

            <a href="#mot-de-passe-oublie" className="hover:text-light-purple">Mot de passe oublié ?</a>

            <p className="text-light-gray">
                Vous n’avez pas de compte ? Vous pouvez en 
                <a href="" className="text-white hover:text-light-purple"> créer un</a>
            </p>
        </section>
    );
}


export default SectionSeConnecter;