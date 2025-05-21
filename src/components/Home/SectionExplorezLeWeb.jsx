// SectionExplorezLeWeb.jsx

function SectionExplorezLeWeb() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl">Explorez le Web sous toutes ses facettes</h1>
            <p>Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.</p>
            <div className="text-base font-normal flex items-center space-x-8">
                <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">Découvrir les articles</button>
                <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">S'abonner à la newsletter</button>
            </div>
            <img 
                src="src/assets/Desktop-App.png"
                className="relative z-10 w-[600px] h-[340px] drop-shadow-2xl mt-4 -translate-x-7" // Ajustement dû à l'espace dans l'image
                alt="Desktop-App"
            ></img>
        </section>
    );
}

export default SectionExplorezLeWeb;