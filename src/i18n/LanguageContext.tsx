"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import sq from "./sq.json";
import en from "./en.json";

type Locale = "sq" | "en";
type Translations = typeof sq;

const dictionaries: Record<Locale, Translations> = { sq, en };

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "sq",
  t: sq,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("sq");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
