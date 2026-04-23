"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Section = {
  heading: string;
  body?: string;
  items?: string[];
  intro?: string;
};

function ParkingAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Pre-compute all transforms at hook level (fixed count = 5 slots + 1 icon = 6 calls, always stable)
  const o0 = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.12, 1, 0.4]);
  const s0 = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const o1 = useTransform(scrollYProgress, [0.08, 0.28, 0.58], [0.12, 1, 0.4]);
  const s1 = useTransform(scrollYProgress, [0.08, 0.28], [0.3, 1]);
  const o2 = useTransform(scrollYProgress, [0.16, 0.36, 0.66], [0.12, 1, 0.4]);
  const s2 = useTransform(scrollYProgress, [0.16, 0.36], [0.3, 1]);
  const o3 = useTransform(scrollYProgress, [0.24, 0.44, 0.74], [0.12, 1, 0.4]);
  const s3 = useTransform(scrollYProgress, [0.24, 0.44], [0.3, 1]);
  const o4 = useTransform(scrollYProgress, [0.32, 0.52, 0.82], [0.12, 1, 0.4]);
  const s4 = useTransform(scrollYProgress, [0.32, 0.52], [0.3, 1]);
  const iconOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const slots = [
    { opacity: o0, scaleY: s0, height: 48, bg: "#2563eb" },
    { opacity: o1, scaleY: s1, height: 56, bg: "#1d4ed8" },
    { opacity: o2, scaleY: s2, height: 64, bg: "#2563eb" },
    { opacity: o3, scaleY: s3, height: 52, bg: "#1d4ed8" },
    { opacity: o4, scaleY: s4, height: 60, bg: "#2563eb" },
  ];

  return (
    <div ref={ref} className="flex items-end gap-2 h-20" aria-hidden>
      {slots.map((slot, i) => (
        <motion.div
          key={i}
          style={{ opacity: slot.opacity, scaleY: slot.scaleY, transformOrigin: "bottom", background: slot.bg, height: slot.height }}
          className="w-8 rounded-t-md"
        />
      ))}
      <motion.div style={{ opacity: iconOpacity }} className="ml-2 self-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ocean">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12h4a2 2 0 0 0 0-4H8v8m4-4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function PrivacyPage() {
  const { locale } = useLanguage();

  const content =
    locale === "sq"
      ? {
          title: "Politika e Privatësisë",
          lastUpdated: "Parko Tani  ·  Përditësuar së fundmi: 22 Mars 2026",
          sections: [
            {
              heading: "1. Informacioni që mbledhim",
              items: [
                "Informacion llogarie: Emri, adresa email dhe fjalëkalimi kur regjistroheni.",
                "Të dhëna lokacioni: Lokacioni i pajisjes suaj për të shfaqur vendet e parkimit pranë jush dhe për të ndihmuar me navigimin. Përdoret vetëm ndërkohë që aplikacioni është aktiv.",
                "Informacion mbi mjetin: Detaje që jepni për mjetin tuaj për qëllime rezervimi.",
                "Të dhëna përdorimi: Historia e rezervimeve, ndërveprimet me vendet e parkimit dhe aktiviteti në aplikacion.",
                "Foto: Nëse ngarkoni imazhe të vendit tuaj të parkimit (vetëm për pronarët).",
              ],
            },
            {
              heading: "2. Si e përdorim informacionin tuaj",
              items: [
                "Për të krijuar dhe menaxhuar llogarinë tuaj.",
                "Për të shfaqur vendet e parkimit të disponueshme pranë jush.",
                "Për të procesuar rezervimet ndërmjet shoferëve dhe pronarëve të parkimeve.",
                "Për të dërguar email transaksionale (verifikimi i llogarisë, rivendosja e fjalëkalimit).",
                "Për të përmirësuar aplikacionin dhe zgjidhur probleme.",
              ],
            },
            {
              heading: "3. Ndarja e informacionit tuaj",
              intro: "Ne nuk e shesim të dhënat tuaja personale. Ndajmë të dhëna vetëm me:",
              items: [
                "Resend – për dërgimin e emaileve transaksionale.",
                "Cloudinary – për ruajtjen e imazheve të ngarkuara.",
                "Railway – për hostimin e infrastrukturës sonë.",
              ],
              body: "Të gjithë ofruesit e palëve të treta janë të lidhur nga politikat e tyre të privatësisë dhe ligjet përkatëse të mbrojtjes së të dhënave.",
            },
            {
              heading: "4. Ruajtja e të dhënave",
              body: "Ne ruajmë të dhënat tuaja për aq kohë sa llogaria juaj është aktive. Mund të kërkoni fshirjen e llogarisë dhe të dhënave tuaja duke na kontaktuar.",
            },
            {
              heading: "5. Të drejtat tuaja",
              body: "Ju keni të drejtë të aksesoni, korrigjoni ose fshini të dhënat tuaja personale në çdo kohë. Për të ushtruar këto të drejta, na kontaktoni në support@parkotani.com.",
            },
            {
              heading: "6. Siguria",
              body: "Ne përdorim masa standarde të industrisë, duke përfshirë HTTPS, fjalëkalime të enkriptuara dhe autentifikim bazuar në JWT, për të mbrojtur të dhënat tuaja.",
            },
            {
              heading: "7. Privatësia e fëmijëve",
              body: "Parko Tani nuk drejtohet ndaj fëmijëve nën moshën 13 vjeç. Ne nuk mbledhim me dije të dhëna nga fëmijët.",
            },
            {
              heading: "8. Ndryshimet në këtë politikë",
              body: "Mund ta përditësojmë këtë politikë. Do t'ju njoftojmë për ndryshime të rëndësishme përmes email-it ose njoftimit brenda aplikacionit.",
            },
            {
              heading: "9. Kontakti",
              body: "Nëse keni pyetje rreth kësaj politike, na kontaktoni: info@parkotani.com · Parko Tani · Shqipëri",
            },
          ] as Section[],
        }
      : {
          title: "Privacy Policy",
          lastUpdated: "Parko Tani  ·  Last updated: March 22, 2026",
          sections: [
            {
              heading: "1. Information We Collect",
              items: [
                "Account information: Your name, email address, and password when you register.",
                "Location data: Your device location to show nearby parking spots and assist with navigation. This is only used while the app is active.",
                "Vehicle information: Details you provide about your vehicle for booking purposes.",
                "Usage data: Booking history, parking spot interactions, and app activity.",
                "Photos: If you upload images of your parking spot (owners only).",
              ],
            },
            {
              heading: "2. How We Use Your Information",
              items: [
                "To create and manage your account.",
                "To show available parking spots near you.",
                "To process bookings between drivers and parking owners.",
                "To send transactional emails (account verification, password reset).",
                "To improve the app and fix issues.",
              ],
            },
            {
              heading: "3. Sharing Your Information",
              intro: "We do not sell your personal data. We share data only with:",
              items: [
                "Resend – for sending transactional emails.",
                "Cloudinary – for storing uploaded images.",
                "Railway – for hosting our backend infrastructure.",
              ],
              body: "All third-party providers are bound by their own privacy policies and applicable data protection laws.",
            },
            {
              heading: "4. Data Retention",
              body: "We retain your data for as long as your account is active. You may request deletion of your account and data by contacting us.",
            },
            {
              heading: "5. Your Rights",
              body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@parkotani.com.",
            },
            {
              heading: "6. Security",
              body: "We use industry-standard security measures including HTTPS, hashed passwords, and JWT-based authentication to protect your data.",
            },
            {
              heading: "7. Children's Privacy",
              body: "Parko Tani is not directed at children under 13. We do not knowingly collect data from children.",
            },
            {
              heading: "8. Changes to This Policy",
              body: "We may update this policy. We will notify you of significant changes via email or in-app notification.",
            },
            {
              heading: "9. Contact",
              body: "If you have questions about this policy, contact us at: info@parkotani.com · Parko Tani · Albania",
            },
          ] as Section[],
        };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper">
        {/* Hero strip */}
        <div className="bg-ink text-paper pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-x">
            <ParkingAnimation />
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
            <div className="space-y-2">
              {content.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="rounded-2xl border border-ink/[0.07] bg-white hover:border-ink/[0.13] transition-colors duration-300 p-6 md:p-8">
                    <h2 className="font-display font-bold text-base md:text-lg text-ink mb-3 tracking-tight">
                      {section.heading}
                    </h2>
                    {section.intro && (
                      <p className="text-ink/55 leading-relaxed mb-3 text-[15px]">{section.intro}</p>
                    )}
                    {section.items && (
                      <ul className="space-y-2 mb-3">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex gap-3 text-[15px] text-ink/55 leading-relaxed">
                            <span className="mt-[6px] flex-shrink-0 w-1 h-1 rounded-full bg-ocean block" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.body && (
                      <p className="text-[15px] text-ink/55 leading-relaxed">{section.body}</p>
                    )}
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
