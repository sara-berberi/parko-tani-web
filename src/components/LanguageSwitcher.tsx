"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "sq" as const, label: "AL", flag: "", name: "Shqip" },
  { code: "en" as const, label: "EN", flag: "", name: "English" },
];

export function LanguageSwitcher({ scrolled: _scrolled = true }: { scrolled?: boolean } = {}) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === locale)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-10 px-3 text-[12.5px] font-medium text-ink-500 hover:text-ink rounded-full hover:bg-ink/5 transition-colors duration-200"
        aria-label="Change language"
      >
        <span>{current.label}</span>
        <svg
          className={`w-3 h-3 text-ink-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-40 bg-paper rounded-2xl shadow-lifted ring-1 ring-ink/10 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors duration-200 ${
                  locale === lang.code
                    ? "bg-ink/5 text-ink"
                    : "text-ink-500 hover:bg-ink/[0.03] hover:text-ink"
                }`}
              >
                <span>{lang.name}</span>
                {locale === lang.code && (
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-ocean"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
