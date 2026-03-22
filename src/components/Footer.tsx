"use client";

import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-brand-950 text-white overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand — wider */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <Logo className="w-9 h-9" />
              <span className="font-display font-extrabold text-xl tracking-tight">
                Parko <span className="text-accent-blue">Tani</span>
              </span>
            </div>
            <p className="text-sm text-white/25 leading-relaxed max-w-sm mb-7">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/parkotani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-all duration-300 text-white/40 hover:text-white/70"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@parkotani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-all duration-300 text-white/40 hover:text-white/70"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.24 8.24 0 005.58 2.17V11.7a4.85 4.85 0 01-3.77-1.77V6.69h3.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 lg:col-span-3 md:col-start-7">
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-5">
              {t.footer.links}
            </h4>
            <ul className="space-y-3.5">
              {(["features", "howItWorks", "business", "about"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key === "features" ? "stats" : key === "howItWorks" ? "how-it-works" : key}`}
                    className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-300"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-5">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="/privacy" className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-300">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-300">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="mailto:info@parkotani.al" className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-300">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-7 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15 font-medium">
            &copy; {new Date().getFullYear()} Parko Tani. {t.footer.rights}
          </p>
          <p className="text-[11px] text-white/10 font-medium">@parkotani</p>
        </div>
      </div>
    </footer>
  );
}
