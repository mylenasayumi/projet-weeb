// SectionApprenezEtProgressez.jsx

function SectionApprenezEtProgressez() {
    return (
        <section className="bg-dark-blue my-20 p-2">
            <div className="container max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-12">
                <div className="flex-1 text-white space-y-6">
                    <p className="text-xl font-bold">DES RESSOURCES POUR TOUS LES NIVEAUX</p>
                    <h1 className="text-light-purple text-7xl font-extrabold">Apprenez <span className="text-white">et</span> progressez</h1>
                    <p className="text-lg font-normal">Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.</p>
                    <div className="flex items-center space-x-8">
                        <button className="text-xl font-medium py-2 hover:text-light-purple cursor-pointer">Explorer les ressources →</button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <img 
                        src="src/assets/Desktop-App.png"
                        className="w-full max-w-[632px] h-[480px] h-auto drop-shadow-2xl"
                        alt="Desktop-App"
                    ></img>
                </div>
            </div>
        </section>
    );
}


export default SectionApprenezEtProgressez;

