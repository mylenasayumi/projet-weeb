// Footer.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
    const MotionLink = motion(Link);

    return (
        <section className="bg-white text-black text-base font-normal p-2">
            <div className="flex flex-col lg:flex-row p-10 gap-10 lg:gap-4 items-start">
                {/* Weeb  */}
                <div className="px-10">
                    <p className="font-bold text-3xl">weeb</p>                            
                </div>

                {/* Grouped links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-6 gap-y-10 w-full max-w-screen-lg mx-auto px-10">
                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">PRODUCT</p>
                            <a href="/prices" className="hover:text-purple">Prices</a>
                            <a href="/preview" className="hover:text-purple">Preview</a>
                            <a href="/browse" className="hover:text-purple">Browse</a>
                            <a href="/accessibility" className="hover:text-purple">Accessibility</a>
                            <a href="/five" className="hover:text-purple">Five</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">SOLUTIONS</p>
                            <a href="/brainstorming" className="hover:text-purple">Brainstorming</a>
                            <a href="/idea-generation" className="hover:text-purple">Idea generation</a>
                            <a href="/prototyping" className="hover:text-purple">Prototyping</a>
                            <a href="/research" className="hover:text-purple">Research</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">RESOURCES</p>
                            <a href="/help-center" className="hover:text-purple">Help Center</a>
                            <a href="/blog" className="hover:text-purple">Blog</a>
                            <a href="/tutorials" className="hover:text-purple">Tutorials</a>
                    </div>

                    <div className="flex flex-col gap-4">
                            <p className="font-medium text-gray">COMPANY</p>
                            <Link to="/" className="hover:text-purple">About Us</Link>
                            <a href="/press" className="hover:text-purple">Press</a>
                            <a href="/events" className="hover:text-purple">Events</a>
                            <a href="/careers" className="hover:text-purple">Careers</a>
                    </div>
                </div>
                
            </div>
            <hr className="my-6 border-t-1 border-light-gray/50 m-10" />

            {/* Footer */}            
            <div className="flex flex-col md:flex-row md:justify-between p-10 gap-10 items-center md:items-start text-center">
                <p>@ 2025 Weeb, Inc. All rights reserved.</p>
                <div className="flex gap-4">
                    <MotionLink
                        to="/youtube"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <img 
                            src="src/assets/Youtube-Icon.png" 
                            alt="Youtube Icon" 
                            className="h-auto drop-shadow-2xl hover:cursor-pointer"
                        ></img>
                    </MotionLink>
                    <MotionLink
                        to="/facebook"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <img 
                            src="src/assets/Facebook-Icon.png" 
                            alt="Facebook Icon" 
                            className="h-auto drop-shadow-2xl hover:cursor-pointer"
                        ></img>
                    </MotionLink>
                    <MotionLink
                        to="/twitter"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <img 
                            src="src/assets/Twitter-Icon.png" 
                            alt="Twitter Icon" 
                            className="h-auto drop-shadow-2xl hover:cursor-pointer"
                        ></img>
                    </MotionLink>
                    <MotionLink
                        to="/instagram"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <img 
                            src="src/assets/Instagram-Icon.png" 
                            alt="Instagram Icon" 
                            className="h-auto drop-shadow-2xl hover:cursor-pointer"
                        ></img>
                    </MotionLink>
                    <MotionLink
                        to="/linkedin"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        <img 
                            src="src/assets/Linkedin-Icon.png" 
                            alt="Linkedin Icon" 
                            className="h-auto drop-shadow-2xl hover:cursor-pointer"
                        ></img>
                    </MotionLink>
                </div>
                
            </div>
        </section>
    );
}

export default Footer;