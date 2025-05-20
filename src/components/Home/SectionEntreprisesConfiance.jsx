// SectionEntreprisesConfiance.jsx

function SectionEntreprisesConfiance() {
    return (
        <section className="bg-dark-blue flex flex-col justify-between items-center">
            <h2 className="text-7xl">Ils nous font confiance</h2>
            <div className="flex space-between">
                <img 
                    src="src/assets/Logo-SmartFinder.png"
                    className="relative z-10 w-[135px] h-[26px] drop-shadow-2xl mt-4 translate-x-7" // Ajustement dû à l'espace dans l'image
                    alt="Logo-SmartFinder"
                ></img>
                <img 
                    src="src/assets/Logo-Zoomer.png"
                    className="relative z-10 w-[135px] h-[26px] drop-shadow-2xl mt-4 translate-x-7" // Ajustement dû à l'espace dans l'image
                    alt="Logo-Zoomer"
                ></img>
                <img 
                    src="src/assets/Logo-Shells.png"
                    className="relative z-10 w-[135px] h-[26px] drop-shadow-2xl mt-4 translate-x-7" // Ajustement dû à l'espace dans l'image
                    alt="Logo-Shells"
                ></img>
                <img 
                    src="src/assets/Logo-Waves.png"
                    className="relative z-10 w-[135px] h-[26px] drop-shadow-2xl mt-4 translate-x-7" // Ajustement dû à l'espace dans l'image
                    alt="Logo-Waves"
                ></img>
                <img 
                    src="src/assets/Logo-ArtVenue.png"
                    className="relative z-10 w-[135px] h-[26px] drop-shadow-2xl mt-4 translate-x-7" // Ajustement dû à l'espace dans l'image
                    alt="Logo-ArtVenue"
                ></img>
            </div>
        </section>
    );
}

export default SectionEntreprisesConfiance;