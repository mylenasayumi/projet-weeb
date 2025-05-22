// SectionExplorezLeWeb.jsx

function SectionExplorezLeWeb() {
    return (
        <section className="bg-dark-blue flex flex-col items-center">
            <h1 className="text-7xl font-extrabold text-center my-20 mx-10">Explorez le <span className="text-light-purple font-light">Web</span> sous toutes ses <span className="underline underline-offset-16 decoration-light-purple decoration-[5px]">facettes</span></h1>
            <p className="text-lg font-normal text-center md:mx-20 mx-6">Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.</p>
            <div className="text-xl font-medium flex items-center m-6 space-x-8">
                <button className="bg-purple text-white px-4 py-4 rounded-[8px] hover:bg-light-purple cursor-pointer">Découvrir les articles</button>
                <button className="text-white px-4 py-3 rounded-[8px] border-2 hover:bg-light-purple cursor-pointer">S'abonner à la newsletter</button>
            </div>
            <img 
                src="src/assets/Desktop-App.png"
                className="w-full max-w-[1100px] h-auto drop-shadow-2xl mt-8"  
                alt="Desktop-App"
            ></img>
        </section>
    );
}

export default SectionExplorezLeWeb;