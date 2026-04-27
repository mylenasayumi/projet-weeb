import { useEffect, useRef, useState } from "react";
import Flag from "react-world-flags";

import AnimatedDropdownDiv from "../components/ui/AnimatedDropdownDiv";

import { useLanguage } from "./LanguageContext";

const languages = [
  { code: "en", label: "EN", flag: "GB", text: "English" },
  { code: "fr", label: "FR", flag: "FR", text: "Français" },
];

function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === lang);

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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dark-blue flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl hover:cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Flag
            code={currentLang.flag}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <span className="text-sm font-medium text-white">
          {currentLang.label}
        </span>
      </button>

      {/* Language options dropdown */}
      {isOpen && (
        <AnimatedDropdownDiv className="absolute bg-dark-blue left-0 mt-2 py-1 w-28 border-2 rounded-[18px] shadow-2xl z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLanguage(l.code);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 shadow-2xl hover:cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Flag
                  code={l.flag}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <span className="text-sm font-medium text-white">{l.text}</span>
            </button>
          ))}
        </AnimatedDropdownDiv>
      )}
    </div>
  );
}

export default LanguageSwitcher;
