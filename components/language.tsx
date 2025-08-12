"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "hi" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  isHindi: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gpmanch_language");
      if (saved === "hi" || saved === "en") setLanguageState(saved);
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("gpmanch_language", lang);
    } catch {}
  };

  const value = useMemo(
    () => ({ language, setLanguage, isHindi: language === "hi" }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}


