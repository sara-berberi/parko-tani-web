"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-paper pt-[120px] md:pt-[140px] pb-24 md:pb-32 overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left: copy ── */}
          <div className="lg:col-span-6">
            <motion.div {...fadeUp(0)} className="eyebrow mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              {...fadeUp(0.05)}
              className="display text-[44px] sm:text-6xl lg:text-[76px] leading-[0.98] tracking-[-0.025em] mb-8"
            >
              {t.hero.headline1}{" "}
              <span className="text-ocean">{t.hero.headline2}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.1)}
              className="text-[17px] lg:text-[19px] text-ink-500 max-w-xl leading-[1.55] mb-10"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              {...fadeUp(0.15)}
              className="flex flex-wrap items-center gap-3 mb-16"
            >
              <a href="#download" className="btn-primary">
                {t.hero.cta}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            <motion.div
              {...fadeUp(0.22)}
              className="grid sm:grid-cols-3 gap-6 max-w-2xl hairline-t pt-8"
            >
              {t.value.items.map((item, i) => (
                <div key={i}>
                  <div className="font-display font-extrabold text-[13px] text-ocean mb-1.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[13.5px] font-medium text-ink mb-1">
                    {item.title}
                  </div>
                  <div className="text-[12.5px] text-ink-400 leading-relaxed">
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: animated iPhone mockup ── */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="relative mx-auto max-w-[300px] lg:max-w-[340px] lg:ml-auto"
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-x-10 -bottom-10 h-20 blur-3xl opacity-25 rounded-full pointer-events-none"
                style={{ background: "#1e4d92" }}
              />

              {/* iPhone shell */}
              <PhoneMockup />

              {/* Floating overlays — outside the phone */}
              <FloatingOverlays />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   iPhone shell with animated screen contents
────────────────────────────────────────── */
function PhoneMockup() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full rounded-[44px] overflow-hidden"
      style={{
        aspectRatio: "9 / 19.5",
        background: "linear-gradient(180deg, #1c1c1e 0%, #0a0a0f 100%)",
        boxShadow:
          "0 60px 100px -30px rgba(11,18,32,0.35), 0 20px 40px -20px rgba(11,18,32,0.25), 0 0 0 1.5px rgba(255,255,255,0.1)",
        padding: "7px",
      }}
    >
      {/* Dynamic Island */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black rounded-full"
        style={{ width: "34%", height: 26 }}
      />

      {/* Screen */}
      <div
        className="relative w-full h-full overflow-hidden bg-[#eef2f7]"
        style={{ borderRadius: 38 }}
      >
        {/* Screenshot as base */}
        <img
          src="/launches/11.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Animated overlay elements on top of screenshot */}
        <LivePulse reduced={!!reduced} />
        <IncomingNotif reduced={!!reduced} />
        {/* <ReservationBubble reduced={!!reduced} /> */}
        <ConfirmBubble reduced={!!reduced} />
      </div>
    </div>
  );
}

/* ── Live "vend u lirua" pulse indicator ── */
function LivePulse({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease }}
      className="absolute top-[18%] left-[8%] z-20 flex items-center gap-2 px-3 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(11,18,32,0.12)",
      }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        {!reduced && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-60"
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      <span className="text-[11px] font-semibold text-ink whitespace-nowrap">
        1 vend u lirua
      </span>
    </motion.div>
  );
}

/* ── Incoming notification bubble ── */
function IncomingNotif({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8, duration: 0.55, ease }}
      className="absolute top-[30%] right-[5%] z-20 max-w-[58%]"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px 4px 16px 16px",
        padding: "10px 12px",
        boxShadow: "0 4px 20px rgba(11,18,32,0.1)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-4 h-4 rounded-md bg-ocean flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">P</span>
        </div>
        <span className="text-[9px] font-semibold text-ink-400 uppercase tracking-wide">
          Parko Tani
        </span>
      </div>
      <p className="text-[11px] font-medium text-ink leading-snug">
        Rezervimi yt u konfirmua ✓
      </p>
      <p className="text-[10px] text-ink-400 mt-0.5">
        Rr. Ibrahim Rugova · tani
      </p>
    </motion.div>
  );
}

// /* ── "Rezervo" action bubble from user ── */
// function ReservationBubble({ reduced }: { reduced: boolean }) {
//   return (
//     // <motion.div
//     //   initial={{ opacity: 0, x: -30 }}
//     //   animate={{ opacity: 1, x: 0 }}
//     //   transition={{ delay: 2.4, duration: 0.5, ease }}
//     //   className="absolute top-[48%] left-[5%] z-20"
//     //   style={{
//     //     background: "#1e4d92",
//     //     borderRadius: "4px 16px 16px 16px",
//     //     padding: "9px 14px",
//     //     boxShadow: "0 4px 16px rgba(30,77,146,0.35)",
//     //   }}
//     // >
//     //   {/* <p className="text-[11px] font-semibold text-white whitespace-nowrap">
//     //     Rezervo vendin →
//     //   </p> */}
//     // </motion.div>
//   );
// }

/* ── Owner confirms ── */
function ConfirmBubble({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 3.0,
        duration: 0.45,
        ease,
        type: "spring",
        stiffness: 200,
      }}
      className="absolute top-[60%] right-[8%] z-20 flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{
        background: "rgba(58,157,122,0.92)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(58,157,122,0.3)",
      }}
    >
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[11px] font-semibold text-white whitespace-nowrap">
        Konfirmuar
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Floating stat cards outside the phone
────────────────────────────────────────── */
function FloatingOverlays() {
  return (
    <>
      {/* Available spots — top left of phone */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease }}
        className="absolute -left-10 top-[22%] hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
        style={{
          background: "rgba(246,245,240,0.96)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 4px 24px rgba(11,18,32,0.1), 0 0 0 1px rgba(11,18,32,0.06)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-accent-green" />
        <span className="text-[12px] text-ink font-semibold">
          24 vende · live
        </span>
      </motion.div>

      {/* Price chip — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease }}
        className="absolute -right-8 bottom-[28%] hidden lg:flex flex-col items-end gap-1 px-3.5 py-3 rounded-xl"
        style={{
          background: "rgba(246,245,240,0.96)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 4px 24px rgba(11,18,32,0.1), 0 0 0 1px rgba(11,18,32,0.06)",
        }}
      >
        <span className="text-[10px] text-ink-400 uppercase tracking-wider font-medium">
          çmimi
        </span>
        <span className="text-[16px] font-extrabold text-ink font-display leading-none">
          250 ALL
        </span>
        <span className="text-[10px] text-ink-400">/ orë</span>
      </motion.div>
    </>
  );
}
