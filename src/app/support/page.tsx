"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SupportPage() {
  const { locale } = useLanguage();

  const content =
    locale === "sq"
      ? {
          title: "Mbështetje",
          subtitle: "Keni nevojë për ndihmë me parkimin? Jemi këtu.",
          body: "Nëse keni probleme ose pyetje rreth përdorimit të Parko Tani, na kontaktoni:",
          instagram: "Instagram: @parkotani",
          email: "Email: support@parkotani.com",
          note: "Zakonisht përgjigjemi shpejt dhe jemi të lumtur t'ju ndihmojmë.",
        }
      : {
          title: "Support",
          subtitle: "Need help with parking? We've got you.",
          body: "If you're experiencing any issues or have questions about using Parko Tani, feel free to reach out to us:",
          instagram: "Instagram: @parkotani",
          email: "Email: support@parkotani.com",
          note: "We usually respond quickly and are happy to help.",
        };

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-32">
        <div className="section-container max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-brand-700 mb-3">
            {content.title}
          </h1>
          <p className="text-xl text-brand-500 font-medium mb-10">{content.subtitle}</p>
          <p className="text-brand-400 leading-relaxed mb-8">{content.body}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">📩</span>
              <a
                href="https://instagram.com/parkotani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 font-medium hover:underline"
              >
                {content.instagram}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <a
                href="mailto:support@parkotani.com"
                className="text-brand-700 font-medium hover:underline"
              >
                {content.email}
              </a>
            </div>
          </div>
          <p className="text-brand-400 leading-relaxed mt-10">{content.note}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
