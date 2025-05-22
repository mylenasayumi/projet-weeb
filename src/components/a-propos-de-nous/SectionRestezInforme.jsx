// SectionRestezInforme.jsx

function SectionRestezInforme() {
    return (
        <section className="bg-dark-blue my-14 p-4">
            <div className="container max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-12">
                <div className="flex-1 flex justify-center">
                    <img 
                        src="src/assets/Shapes.png"
                        className="w-full max-w-[415.82px] h-auto max-h-[412px] drop-shadow-2xl"
                        alt="Shapes"
                    ></img>
                </div>
                <div className="flex-1 text-white space-y-6">
                    <p className="text-xl font-bold">LE WEB, UN ÉCOSYSTÈME EN CONSTANT ÉVOLUTION</p>
                    <h1 className="text-7xl font-extrabold">Restez informé des dernières <span className="text-light-purple">tendances</span></h1>
                    <p className="text-lg font-normal">Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !</p>
                    <div className="flex items-center space-x-8">
                        <button className="text-white text-xl font-medium py-2 hover:text-light-purple cursor-pointer">Lire les articles récents →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionRestezInforme;