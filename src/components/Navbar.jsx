// Navbar.jsx

import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-dark-blue">
            <nav className="w-full text-white py-4">
                <div className="relative container max-w-screen-2xl mx-auto flex justify-between items-center px-8 md:px-20">
                    {/* Liste NavbarHome */}
                    <ul className="flex space-x-6">
                        <p className="font-bold">weeb</p>                            
                        <li>                            
                            <Link to="/home" className="hover:text-purple">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-purple">Contact</Link>
                        </li>
                    </ul>

                    {/* Login/Join */}
                    <div className="text-base font-normal flex items-center space-x-8">
                        <Link to="/login" className="hover:text-purple">Log In</Link>
                        {/* Ver se mantém botão ou link "a href" */}
                        <button className="bg-purple text-white text-base font-normal px-8 py-2 rounded-full hover:bg-light-purple cursor-pointer">Join Now</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;