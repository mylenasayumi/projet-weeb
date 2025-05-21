// SectionRestezInforme.jsx

function SectionRestezInforme() {
    return (
        <section className="bg-dark-blue">
            <div className="container max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-12">
                <div className="flex-1 flex justify-center">
                    <img 
                        src="src/assets/Desktop-App.png"
                        className="w-full h-[480px] drop-shadow-2xl -translate-x-7"
                        alt="Desktop-App"
                    ></img>
                </div>
                <div className="flex-1 text-white space-y-6">
                    <p className="text-base">LE WEB, UN ÉCOSYSTÈME EN CONSTANT ÉVOLUTION</p>
                    <h1 className="text-5xl md:text-7xl font-bold">Restez informé des dernières tendances</h1>
                    <p className="text-lg">Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !</p>
                    <div className="text-base font-normal flex items-center space-x-8">
                        <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">Lire les articles récents →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionRestezInforme;