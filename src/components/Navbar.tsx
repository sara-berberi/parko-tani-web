"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const navLinks = [
  { key: "howItWorks", href: "#how-it-works" },
  { key: "features", href: "#app" },
  { key: "business", href: "#business" },
] as const;

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-xl hairline-b"
            : "bg-transparent"
        }`}
      >
        <div className="container-x">
          <nav className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <Logo className="w-7 h-7 transition-transform duration-300 group-hover:rotate-[4deg]" />
              <span className="font-display text-[19px] tracking-tight text-ink font-extrabold">
                Parko <span className="text-ocean">Tani</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="text-[13.5px] text-ink-500 hover:text-ink transition-colors duration-200 link-underline"
                >
                  {t.nav[key]}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher scrolled={true} />
              <a href="#download" className="hidden md:inline-flex btn-primary h-10 px-5 text-[13px]">
                {t.nav.download}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-ink/5 transition-colors"
                aria-label="Menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-px bg-ink origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-px bg-ink mt-[7px] origin-center"
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-paper lg:hidden pt-[68px]"
          >
            <div className="container-x flex flex-col pt-12 gap-2">
              {navLinks.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  className="block py-5 font-display text-4xl text-ink hairline-b"
                >
                  {t.nav[key]}
                </motion.a>
              ))}
              <motion.a
                href="#download"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-10 h-14 text-base"
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
