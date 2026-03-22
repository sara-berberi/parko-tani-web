"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const navLinks = [
  { key: "features", href: "#stats" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "business", href: "#business" },
  { key: "about", href: "#about" },
] as const;

export function Navbar({ lightBg = false }: { lightBg?: boolean }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 md:py-3"
            : "py-4 md:py-5"
        }`}
      >
        <div className={`section-container transition-all duration-500 ${
          scrolled ? "" : ""
        }`}>
          <nav
            className={`flex items-center justify-between transition-all duration-500 rounded-2xl ${
              scrolled
                ? "px-5 md:px-8 py-3 md:py-3.5 bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] border border-white/60"
                : "px-0"
            }`}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <Logo className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display font-extrabold text-lg md:text-xl tracking-tight">
                <span className={scrolled || lightBg ? "text-brand-700" : "text-white"}>Parko </span>
                <span className="text-brand-500">Tani</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                    scrolled || lightBg
                      ? "text-brand-400 hover:text-brand-700 hover:bg-brand-50"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t.nav[key]}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              <LanguageSwitcher scrolled={scrolled} />
              <a
                href="#download"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-sm active:scale-[0.98]"
              >
                {t.nav.download}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-colors ${
                  scrolled || lightBg ? "hover:bg-brand-50" : "hover:bg-white/10"
                }`}
                aria-label="Menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`block w-5 h-[1.5px] origin-center transition-colors ${
                    scrolled || lightBg ? "bg-brand-700" : "bg-white"
                  }`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className={`block w-5 h-[1.5px] mt-[5px] transition-colors ${
                    scrolled || lightBg ? "bg-brand-700" : "bg-white"
                  }`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`block w-5 h-[1.5px] mt-[5px] origin-center transition-colors ${
                    scrolled || lightBg ? "bg-brand-700" : "bg-white"
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
              {navLinks.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-5 text-2xl font-display font-bold text-white/80 hover:text-white transition-colors rounded-2xl hover:bg-white/5"
                >
                  {t.nav[key]}
                </motion.a>
              ))}
              <motion.a
                href="#download"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full max-w-xs text-center px-8 py-4.5 bg-brand-500 text-white text-lg font-bold rounded-2xl shadow-glow-lg"
              >
                {t.nav.download}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
