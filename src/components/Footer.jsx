// Footer.jsx

import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="bg-white text-black">
            <div className="flex flex-row">
                <p className="font-bold">weeb</p>                            

                <div className="container max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-8 md:px-16 gap-6">
                        <p className="text-base text-gray">PRODUCT</p>
                        <a href="#pricing" className="hover:text-purple">Pricing</a>
                        <a href="#overview" className="hover:text-purple">Overview</a>
                        <a href="#browse" className="hover:text-purple">Browse</a>
                        <a href="#accessibility" className="hover:text-purple">Accessibility</a>
                        <a href="#five" className="hover:text-purple">Five</a>   
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-8 md:px-16 gap-6">
                        <p className="text-base text-gray">SOLUTIONS</p>
                        <a href="#brainstorming" className="hover:text-purple">Brainstorming</a>
                        <a href="#ideation" className="hover:text-purple">Ideation</a>
                        <a href="#wireframing" className="hover:text-purple">Wireframing</a>
                        <a href="#research" className="hover:text-purple">Research</a>
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-8 md:px-16 gap-6">
                        <p className="text-base text-gray">RESOURCES</p>
                        <a href="#help-center" className="hover:text-purple">Help Center</a>
                        <a href="#blog" className="hover:text-purple">Blog</a>
                        <a href="#tutorials" className="hover:text-purple">Tutorials</a>
                </div>

                <div className="container max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-8 md:px-16 gap-6">
                        <p className="text-base text-gray">COMPANY</p>
                        <Link to="/home" className="hover:text-purple">About</Link>
                        <a href="#press" className="hover:text-purple">Press</a>
                        <a href="#events" className="hover:text-purple">Events</a>
                        <a href="#careers" className="hover:text-purple">Careers</a>
                </div>
            </div>
            <hr class="my-8 border-t-2 border-gray-300 m-4" />

            {/* bottom */}
            <div className="flex justify-between items-center">
                <p>@ 2025 Weeb, Inc. All rights reserved.</p>
                <img 
                    src="src/assets/Social-Icons.png"
                    className="w-[184px] h-[24px] drop-shadow-2xl -translate-x-7"
                    alt="Social-Icons"
                ></img>
            </div>
        </section>
    );
}

export default Footer;