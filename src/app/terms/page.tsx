"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParkingLines() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const heights = [1, 0.6, 0.9, 0.5, 0.75, 0.4, 0.85];
  const o0 = useTransform(scrollYProgress, [0, 0.18], [0.1, 0.9]);
  const o1 = useTransform(scrollYProgress, [0.06, 0.24], [0.1, 0.9]);
  const o2 = useTransform(scrollYProgress, [0.12, 0.30], [0.1, 0.9]);
  const o3 = useTransform(scrollYProgress, [0.18, 0.36], [0.1, 0.9]);
  const o4 = useTransform(scrollYProgress, [0.24, 0.42], [0.1, 0.9]);
  const o5 = useTransform(scrollYProgress, [0.30, 0.48], [0.1, 0.9]);
  const o6 = useTransform(scrollYProgress, [0.36, 0.54], [0.1, 0.9]);
  const sy0 = useTransform(scrollYProgress, [0, 0.18], [0.2, heights[0]]);
  const sy1 = useTransform(scrollYProgress, [0.06, 0.24], [0.2, heights[1]]);
  const sy2 = useTransform(scrollYProgress, [0.12, 0.30], [0.2, heights[2]]);
  const sy3 = useTransform(scrollYProgress, [0.18, 0.36], [0.2, heights[3]]);
  const sy4 = useTransform(scrollYProgress, [0.24, 0.42], [0.2, heights[4]]);
  const sy5 = useTransform(scrollYProgress, [0.30, 0.48], [0.2, heights[5]]);
  const sy6 = useTransform(scrollYProgress, [0.36, 0.54], [0.2, heights[6]]);

  const slots = [
    { opacity: o0, scaleY: sy0 },
    { opacity: o1, scaleY: sy1 },
    { opacity: o2, scaleY: sy2 },
    { opacity: o3, scaleY: sy3 },
    { opacity: o4, scaleY: sy4 },
    { opacity: o5, scaleY: sy5 },
    { opacity: o6, scaleY: sy6 },
  ];

  return (
    <div ref={ref} className="flex items-end gap-[6px] h-16" aria-hidden>
      {slots.map((slot, i) => (
        <motion.div
          key={i}
          style={{ opacity: slot.opacity, scaleY: slot.scaleY, transformOrigin: "bottom" }}
          className="w-6 h-14 rounded-t bg-ocean/80"
        />
      ))}
    </div>
  );
}

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
      <main className="min-h-screen bg-paper">
        {/* Hero strip */}
        <div className="bg-ink text-paper pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-x">
            <ParkingLines />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="eyebrow mb-5 text-paper/40 before:bg-paper/20">Legal</div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-paper leading-[1.05]">
                {content.title}
              </h1>
              <p className="mt-4 text-sm text-paper/35 font-mono">{content.lastUpdated}</p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container-x py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Progress indicator */}
            <div className="flex gap-1 mb-10">
              {content.sections.map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 flex-1 rounded-full bg-ocean/20"
                  style={{ opacity: 1 - i * 0.08 }}
                />
              ))}
            </div>

            <div className="space-y-3">
              {content.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex gap-5 rounded-2xl border border-ink/[0.07] bg-white hover:border-ink/[0.12] hover:shadow-sm transition-all duration-300 p-6 md:p-8">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-ocean/10 flex items-center justify-center mt-0.5"
                      aria-hidden
                    >
                      <span className="text-[11px] font-bold text-ocean">{i + 1}</span>
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base md:text-lg text-ink mb-2 tracking-tight">
                        {section.heading}
                      </h2>
                      <p className="text-[15px] text-ink/55 leading-relaxed">{section.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
