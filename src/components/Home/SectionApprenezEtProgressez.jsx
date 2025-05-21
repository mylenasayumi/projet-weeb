// SectionApprenezEtProgressez.jsx

function SectionApprenezEtProgressez() {
    return (
        <section className="bg-dark-blue">
            <div className="container max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-12">
                <div className="flex-1 text-white space-y-6">
                    <p className="text-base">DES RESSOURCES POUR TOUS LES NIVEAUX</p>
                    <h1 className="text-5xl md:text-7xl font-bold">Apprenez et progressez</h1>
                    <p className="text-lg">Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.</p>
                    <div className="text-base font-normal flex items-center space-x-8">
                        <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">Explorer les ressources →</button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <img 
                        src="src/assets/Desktop-App.png"
                        className="w-full h-[480px] drop-shadow-2xl -translate-x-7"
                        alt="Desktop-App"
                    ></img>
                </div>
            </div>
        </section>
    );
}

export default SectionApprenezEtProgressez;