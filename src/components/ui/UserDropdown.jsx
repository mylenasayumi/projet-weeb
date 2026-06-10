// UserDropdown.jsx
// User dropdown component for the user menu in the navbar.
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../languages/LanguageContext";

import AnimatedDropdownDiv from "./AnimatedDropdownDiv";

function UserDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useLanguage();

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
        <AnimatedDropdownDiv className="bg-white text-dark-blue border-1 right-0 mt-4 w-40 text-center rounded-[18px] shadow-2xl p-1.5 absolute z-50">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2 rounded hover:text-purple"
          >
            {t("navbar.myProfile")}
          </Link>
          <button
            onClick={onLogout}
            className="w-full text-center px-4 py-2 rounded hover:text-purple cursor-pointer"
          >
            {t("navbar.logout")}
          </button>
        </AnimatedDropdownDiv>
      )}
    </div>
  );
}

export default UserDropdown;
