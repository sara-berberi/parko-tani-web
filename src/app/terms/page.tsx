"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

export default function TermsPage() {
  const { locale } = useLanguage();

  const content = locale === "sq" ? {
    title: "Kushtet e Përdorimit",
    lastUpdated: "Përditësuar së fundmi: Mars 2026",
    sections: [
      {
        heading: "1. Pranimi i kushteve",
        body: "Duke përdorur aplikacionin Parko Tani, ju pranoni këto kushte përdorimi. Nëse nuk jeni dakord me kushtet, ju lutem mos e përdorni aplikacionin."
      },
      {
        heading: "2. Shërbimi",
        body: "Parko Tani ofron një platformë për gjetjen dhe rezervimin e vendeve të parkimit në Tiranë. Ne nuk garantojmë disponueshmërinë e vazhdueshme të vendeve të parkimit."
      },
      {
        heading: "3. Llogaria e përdoruesit",
        body: "Ju jeni përgjegjës për ruajtjen e konfidencialitetit të llogarisë suaj dhe për të gjitha aktivitetet që ndodhin nën llogarinë tuaj."
      },
      {
        heading: "4. Rezervimet",
        body: "Rezervimet janë subjekt i konfirmimit nga pronari i parkimit. Parko Tani nuk garanton që çdo rezervim do të pranohet."
      },
      {
        heading: "5. Kufizimi i përgjegjësisë",
        body: "Parko Tani nuk mban përgjegjësi për dëme që mund të ndodhin si rezultat i përdorimit të aplikacionit, përfshirë por pa u kufizuar në dëme ndaj automjeteve."
      },
      {
        heading: "6. Ndryshimet",
        body: "Ne rezervojmë të drejtën për të ndryshuar këto kushte në çdo kohë. Ndryshimet do të njoftohen përmes aplikacionit."
      },
      {
        heading: "7. Kontakti",
        body: "Për pyetje rreth kushteve të përdorimit: info@parkotani.al"
      }
    ]
  } : {
    title: "Terms of Service",
    lastUpdated: "Last updated: March 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By using the Parko Tani app, you agree to these terms of service. If you do not agree with these terms, please do not use the app."
      },
      {
        heading: "2. Service",
        body: "Parko Tani provides a platform for finding and reserving parking spots in Tirana. We do not guarantee continuous availability of parking spots."
      },
      {
        heading: "3. User Account",
        body: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account."
      },
      {
        heading: "4. Reservations",
        body: "Reservations are subject to confirmation by the parking owner. Parko Tani does not guarantee that every reservation will be accepted."
      },
      {
        heading: "5. Limitation of Liability",
        body: "Parko Tani is not liable for damages that may occur as a result of using the app, including but not limited to vehicle damages."
      },
      {
        heading: "6. Changes",
        body: "We reserve the right to modify these terms at any time. Changes will be notified through the app."
      },
      {
        heading: "7. Contact",
        body: "For questions about the terms of service: info@parkotani.al"
      }
    ]
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-32">
        <div className="section-container max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-brand-700 mb-3">
            {content.title}
          </h1>
          <p className="text-sm text-brand-300 mb-12">{content.lastUpdated}</p>
          <div className="space-y-8">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display font-bold text-lg md:text-xl text-brand-700 mb-3">
                  {section.heading}
                </h2>
                <p className="text-brand-400 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
