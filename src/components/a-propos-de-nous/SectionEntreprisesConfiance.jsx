// SectionEntreprisesConfiance.jsx

function SectionEntreprisesConfiance() {
    return (
        <section className="bg-dark-blue flex flex-col justify-between items-center my-10">
            <h2 className="text-6xl font-extrabold my-12 mb-20 text-center">Ils nous font confiance</h2>
            {/* <div className="flex justify-between gap-8"> */}
            <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-1 place-items-center gap-9 mx-14 mb-20">
                <img 
                    src="src/assets/Logo-SmartFinder.png"
                    className="w-[176.16px] h-[32px] drop-shadow-2xl"
                    alt="Logo-SmartFinder"
                ></img>
                <img 
                    src="src/assets/Logo-Zoomer.png"
                    className="w-[133px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Zoomer"
                ></img>
                <img 
                    src="src/assets/Logo-Shells.png"
                    className="w-[124.4px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Shells"
                ></img>
                <img 
                    src="src/assets/Logo-Waves.png"
                    className="w-[109.03px] h-[32px] drop-shadow-2xl"
                    alt="Logo-Waves"
                ></img>
                <img 
                    src="src/assets/Logo-ArtVenue.png"
                    className="w-[165.81px] h-[32px] drop-shadow-2xl"
                    alt="Logo-ArtVenue"
                ></img>
            </div>
        </section>
    );
}

export default SectionEntreprisesConfiance;