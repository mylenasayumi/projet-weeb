// NavbarHomeDesktop.jsx

function NavbarHomeDesktop() {
    return (
        <section className="bg-dark-blue">
            <nav className="w-full text-white py-4">
                <div className="relative container max-w-screen-2xl mx-auto flex justify-between items-center px-8 md:px-20">
                    {/* Liste NavbarHomeDesktop */}
                    <ul className="flex space-x-6">
                        <p className="font-bold">weeb</p>                            
                        <li>
                            <a href="#about" className="hover:text-purple">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-purple">
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Login/Join */}
                    <div className="text-base font-normal flex items-center space-x-8">
                        <a href="#login" className="hover:text-purple">
                            Log In
                        </a>
                        {/* Ver se mantém botão ou link "a href" */}
                        <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">Join Now</button>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default NavbarHomeDesktop;