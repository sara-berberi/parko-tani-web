"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

function CarAnimation() {
  return (
    <div className="flex items-center gap-3 h-16" aria-hidden>
      {/* Parking spot grid */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-10 h-[2px] rounded-full bg-paper/20" />
          <div
            className="w-10 rounded-md flex items-center justify-center"
            style={{
              height: 44,
              background: i === 1 ? "rgba(37,99,235,0.6)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {i === 1 && (
              <svg width="18" height="14" viewBox="0 0 24 16" fill="none">
                <rect x="1" y="5" width="22" height="9" rx="2" fill="white" fillOpacity="0.9" />
                <path d="M4 5C4 5 5 1 12 1C19 1 20 5 20 5" stroke="white" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="6" cy="14" r="2" fill="white" fillOpacity="0.9" />
                <circle cx="18" cy="14" r="2" fill="white" fillOpacity="0.9" />
              </svg>
            )}
          </div>
          <div className="w-10 h-[2px] rounded-full bg-paper/20" />
        </motion.div>
      ))}
      {/* P sign */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="ml-2 w-9 h-9 rounded-full bg-ocean flex items-center justify-center"
      >
        <span className="font-display font-extrabold text-white text-lg leading-none">P</span>
      </motion.div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-4 rounded-2xl border border-ink/[0.07] bg-white hover:border-ocean/30 hover:shadow-md transition-all duration-300 p-5 md:p-6 group"
    >
      <div className="w-11 h-11 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ocean/20 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-ink text-[15px] tracking-tight">{label}</div>
      </div>
      <div className="ml-auto text-ink/20 group-hover:text-ocean/50 transition-colors duration-300">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.a>
  );
}

export default function SupportPage() {
  const { locale } = useLanguage();

  const content =
    locale === "sq"
      ? {
          title: "Mbështetje",
          subtitle: "Keni nevojë për ndihmë me parkimin? Jemi këtu.",
          body: "Nëse keni probleme ose pyetje rreth përdorimit të Parko Tani, na kontaktoni:",
          note: "Zakonisht përgjigjemi shpejt dhe jemi të lumtur t'ju ndihmojmë.",
          faq: [
            { q: "Si rezervoj një vend parkimi?", a: "Hap aplikacionin, gjej vendin pranë teje dhe shtyp Rezervo. E thjeshtë." },
            { q: "Mund të anuloj rezervimin tim?", a: "Po, mund ta anulosh rezervimin nga seksioni 'Rezervimet e mia' brenda aplikacionit." },
            { q: "Si regjistrohem si pronar parkimi?", a: "Nga profili juaj, zgjidhni 'Shto parkim' dhe ndiqni hapat e dhënë." },
          ],
        }
      : {
          title: "Support",
          subtitle: "Need help with parking? We've got you.",
          body: "If you're experiencing any issues or have questions about using Parko Tani, feel free to reach out to us:",
          note: "We usually respond quickly and are happy to help.",
          faq: [
            { q: "How do I reserve a parking spot?", a: "Open the app, find a spot near you, and tap Reserve. That's it." },
            { q: "Can I cancel my reservation?", a: "Yes, you can cancel from the 'My Bookings' section inside the app." },
            { q: "How do I register as a parking owner?", a: "From your profile, select 'Add parking' and follow the steps provided." },
          ],
        };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper">
        {/* Hero strip */}
        <div className="bg-ink text-paper pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-x">
            <CarAnimation />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="eyebrow mb-5 text-paper/40 before:bg-paper/20">Help Center</div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-paper leading-[1.05]">
                {content.title}
              </h1>
              <p className="mt-4 text-lg text-paper/50 max-w-md leading-relaxed">{content.subtitle}</p>
            </motion.div>
          </div>
        </div>

        <div className="container-x py-16 md:py-24">
          <div className="max-w-2xl space-y-16">
            {/* Contact channels */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[15px] text-ink/50 leading-relaxed mb-6"
              >
                {content.body}
              </motion.p>
              <div className="space-y-3">
                <ContactCard
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ocean">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m2 7 10 7 10-7" strokeLinecap="round" />
                    </svg>
                  }
                  label="support@parkotani.com"
                  href="mailto:support@parkotani.com"
                  delay={0.1}
                />
                <ContactCard
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ocean">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
                    </svg>
                  }
                  label="@parkotani"
                  href="https://instagram.com/parkotani"
                  delay={0.18}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="mt-5 text-[13px] text-ink/35 leading-relaxed"
              >
                {content.note}
              </motion.p>
            </div>

            {/* FAQ */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="eyebrow mb-6 text-ink/40 before:bg-ink/20"
              >
                FAQ
              </motion.div>
              <div className="space-y-3">
                {content.faq.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-ink/[0.07] bg-white p-6 md:p-7 hover:border-ink/[0.13] transition-colors duration-300"
                  >
                    <h3 className="font-semibold text-ink text-[15px] mb-2 tracking-tight">{item.q}</h3>
                    <p className="text-[14px] text-ink/50 leading-relaxed">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
