"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

/* ──────────────────────────────────────────────────────────────
   A floating phone that mirrors the story beat-for-beat.
   Each panel is a plain opacity/translate crossfade driven by
   scroll progress, so the phone "does" what the copy describes.
────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

export function JourneyHUD({ progress }: { progress: MotionValue<number> }) {
  const { t } = useLanguage();
  const j = t.journey;

  // The phone rises into frame when the driver "opens the app".
  const phoneIn = useTransform(progress, [0.26, 0.38], [0, 1]);
  const phoneY = useTransform(progress, [0.26, 0.38], [40, 0]);
  const phoneOut = useTransform(progress, [0.93, 1], [1, 0]);
  const opacity = useTransform(
    [phoneIn, phoneOut] as const,
    ([a, b]: number[]) => a * b
  );

  // Beat 1: searching / scanning
  const searching = useTransform(progress, [0.3, 0.38, 0.46, 0.52], [0, 1, 1, 0]);
  // Beat 2: spot found
  const found = useTransform(progress, [0.46, 0.54, 0.6, 0.66], [0, 1, 1, 0]);
  // Beat 3: reserving / route
  const reserving = useTransform(
    progress,
    [0.6, 0.68, 0.82, 0.88],
    [0, 1, 1, 0]
  );
  // Beat 4: arrived
  const arrived = useTransform(progress, [0.84, 0.92], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y: phoneY }}
      className="pointer-events-none absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
    >
      <div
        className="relative w-[248px] rounded-[38px] p-[6px]"
        style={{
          aspectRatio: "9 / 19.5",
          background: "linear-gradient(180deg, #1c1c1e 0%, #0a0a0f 100%)",
          boxShadow:
            "0 50px 90px -28px rgba(11,18,32,0.42), 0 18px 36px -18px rgba(11,18,32,0.26), 0 0 0 1.5px rgba(255,255,255,0.1)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 bg-black rounded-full"
          style={{ width: "34%", height: 22 }}
        />

        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden bg-[#eef2f7]"
          style={{ borderRadius: 32 }}
        >
          <ScreenChrome />

          <Panel opacity={searching}>
            <SearchingScreen label={j.acts[1].eyebrow} />
          </Panel>

          <Panel opacity={found}>
            <FoundScreen />
          </Panel>

          <Panel opacity={reserving}>
            <ReservingScreen />
          </Panel>

          <Panel opacity={arrived}>
            <ArrivedScreen />
          </Panel>
        </div>
      </div>
    </motion.div>
  );
}

function Panel({
  opacity,
  children,
}: {
  opacity: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pt-[52px] px-3.5 pb-4 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

/* Static status bar + app header, always on. */
function ScreenChrome() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 pt-3 px-4">
      <div className="flex items-center justify-between text-[9px] font-semibold text-ink/70 mb-2.5">
        <span className="tabular-nums">18:42</span>
        <div className="flex items-center gap-1">
          <span className="block w-3 h-1.5 rounded-[2px] bg-ink/25" />
          <span className="block w-4 h-1.5 rounded-[2px] bg-ink/45" />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-md bg-ocean flex items-center justify-center">
          <span className="text-[8px] font-bold text-white leading-none">P</span>
        </div>
        <span className="text-[10px] font-extrabold text-ink tracking-tight">
          Parko <span className="text-ocean">Tani</span>
        </span>
      </div>
    </div>
  );
}

/* ── Beat 1: scanning the map ───────────────── */
function SearchingScreen({ label }: { label: string }) {
  return (
    <>
      <div className="rounded-xl bg-white/80 backdrop-blur px-2.5 py-2 flex items-center gap-2 shadow-sm">
        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-60"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
        </span>
        <span className="text-[9px] font-semibold text-ink-500 truncate">
          {label}
        </span>
      </div>

      {/* Scanning list */}
      <div className="mt-2.5 space-y-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-7 rounded-lg bg-white/70"
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.16,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-ink/25"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* ── Beat 2: a spot appears ─────────────────── */
function FoundScreen() {
  return (
    <>
      <div className="rounded-2xl bg-white p-3 shadow-[0_8px_24px_-10px_rgba(11,18,32,0.25)]">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-accent-green">
            u lirua tani
          </span>
        </div>
        <p className="text-[12px] font-extrabold text-ink leading-tight font-display">
          Rr. Ibrahim Rugova
        </p>
        <p className="text-[9px] text-ink-400 mt-0.5">240 m · 2 min në këmbë</p>

        <div className="mt-2.5 pt-2.5 flex items-end justify-between border-t border-ink/10">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-ink-400">
              çmimi
            </p>
            <p className="text-[13px] font-extrabold text-ink font-display leading-none mt-0.5">
              250 ALL
            </p>
          </div>
          <span className="text-[8px] text-ink-400 pb-0.5">/ orë</span>
        </div>
      </div>

      <motion.div
        className="mt-2.5 h-8 rounded-full bg-ocean flex items-center justify-center"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-semibold text-white">
          Rezervo vendin
        </span>
      </motion.div>
    </>
  );
}

/* ── Beat 3: reserving + navigating ─────────── */
function ReservingScreen() {
  return (
    <>
      <div className="rounded-2xl bg-white p-3 shadow-[0_8px_24px_-10px_rgba(11,18,32,0.25)]">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-full bg-accent-green flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-ink">
            Rezervimi u konfirmua
          </span>
        </div>
        <p className="text-[8.5px] text-ink-400 leading-snug">
          Vendi është i yti për 30 min. Po navigojmë.
        </p>
      </div>

      {/* Turn card */}
      <div className="mt-2.5 rounded-2xl bg-ink p-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-paper shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-paper truncate">
              Djathtas te Rr. Rugova
            </p>
            <p className="text-[8px] text-paper/50 tabular-nums">180 m</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-2.5 h-1 rounded-full bg-paper/15 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent-green"
            animate={{ width: ["12%", "88%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="mt-auto flex items-baseline justify-between">
        <span className="text-[8px] uppercase tracking-wider text-ink-400">
          mbërritja
        </span>
        <span className="text-[13px] font-extrabold text-ink font-display tabular-nums">
          18:47
        </span>
      </div>
    </>
  );
}

/* ── Beat 4: parked ─────────────────────────── */
function ArrivedScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <motion.div
        className="w-12 h-12 rounded-full bg-accent-green flex items-center justify-center"
        initial={{ scale: 0.6 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <p className="mt-3 text-[13px] font-extrabold text-ink font-display">
        Ke parkuar
      </p>
      <p className="mt-1 text-[9px] text-ink-400 leading-snug px-2">
        Rr. Ibrahim Rugova · vendi 12
      </p>

      <div className="mt-3 px-2.5 py-1 rounded-full bg-accent-green/12">
        <span className="text-[9px] font-semibold text-accent-green tabular-nums">
          5 min gjithsej
        </span>
      </div>
    </div>
  );
}
