import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import Flag from "react-world-flags";
import AnimatedDropdownDiv from "../components/ui/AnimatedDropdownDiv";

const languages = [
    { code: "en", label: "English", flag: "GB" },
    { code: "fr", label: "Français", flag: "FR" },
];

function LanguageSwitcher() {
    const { lang, changeLanguage } = useLanguage();
    const [open, setOpen] = useState(false);

    const currentLang = languages.find((l) => l.code === lang);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="bg-dark-blue flex items-center gap-2 px-4 py-3 rounded hover:cursor-pointer"
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
            {open && (
                <AnimatedDropdownDiv className="absolute right-0 mt-2 w-full border rounded shadow-xl z-50">
                    {languages.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => {
                                changeLanguage(l.code);
                                setOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:cursor-pointer"
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
                            <span className="text-sm font-medium text-white">
                                {l.label}
                            </span>
                        </button>
                    ))}
                </AnimatedDropdownDiv>
            )}
        </div>
    );
}

export default LanguageSwitcher;
