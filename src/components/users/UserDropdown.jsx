// UserDropdown.jsx
// User dropdown component for the user menu in the navbar.
import { useEffect, useState, useRef } from "react";
import AnimatedDropdownDiv from "../ui/AnimatedDropdownDiv";

function UserDropdown({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-purple text-white font-bold w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            >
                {user.first_name?.charAt(0).toUpperCase()}
            </div>
            {/* Dropdown */}
                {isOpen && (
                    <AnimatedDropdownDiv className="bg-white text-black right-0 mt-4 w-40 text-center rounded-lg shadow-lg p-1.5 absolute z-50">
                        <button
                            onClick={onLogout}
                            className="w-full text-center px-4 py-2 rounded"
                        >
                            Se déconnecter
                        </button>
                    </AnimatedDropdownDiv>
                )}
        </div>
    );
}
  
export default UserDropdown;