"use client";

import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper hairline-t">
      <div className="container-x py-20 md:py-24">
        {/* About, folded in as a quiet intro */}
        <div className="max-w-2xl mb-20">
          <div className="eyebrow mb-5">{t.about.eyebrow}</div>
          <p className="font-display text-[24px] md:text-[30px] leading-[1.3] text-ink">
            {t.about.body1}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8 mb-16">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo className="w-6 h-6" />
              <span className="font-display text-[17px] text-ink font-extrabold">
                Parko <span className="text-ocean">Tani</span>
              </span>
            </div>
            <p className="text-[13.5px] text-ink-500 leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-4">
              {t.footer.links}
            </div>
            <ul className="space-y-2.5">
              {[
                { k: "howItWorks", h: "#how-it-works" },
                { k: "features",   h: "#app" },
                { k: "business",   h: "#business" },
                { k: "download",   h: "#download" },
              ].map(({ k, h }) => (
                <li key={k}>
                  <a href={h} className="text-[13.5px] text-ink-500 hover:text-ink transition-colors link-underline">
                    {t.nav[k as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-4">
              {t.footer.legal}
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="/privacy" className="text-[13.5px] text-ink-500 hover:text-ink transition-colors link-underline">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[13.5px] text-ink-500 hover:text-ink transition-colors link-underline">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-4">
              {t.footer.contact}
            </div>
            <a href="https://instagram.com/parkotani" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-ink hover:text-ocean transition-colors link-underline">
              @parkotani
            </a>
            <div className="text-[13.5px] text-ink-500 mt-1.5">Tiranë, Shqipëri</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 hairline-t">
          <div className="text-[12px] text-ink-400">
            © {year} Parko Tani. {t.footer.rights}
          </div>
          <div className="text-[12px] text-ink-400 max-w-md text-right">
            {t.about.mission}
          </div>
        </div>
      </div>
    </footer>
  );
}
