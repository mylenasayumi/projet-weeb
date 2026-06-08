import { createContext, useContext, useEffect, useState } from "react";

import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (["en", "fr"].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  // Updates the document's lang attribute whenever the language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Function to get the translation for a given key
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key; // Return the key if translation is missing
      }
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
