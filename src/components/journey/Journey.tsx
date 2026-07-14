"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { CityScene } from "./CityScene";
import { JourneyHUD } from "./JourneyHUD";

/* Each act owns a slice of the scroll timeline. The copy fades in
   just after its camera move begins, and out just before the next. */
const ACT_WINDOWS: [number, number][] = [
  [0.0, 0.2],
  [0.22, 0.42],
  [0.44, 0.58],
  [0.6, 0.8],
  [0.82, 1.0],
];

export function Journey() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const j = t.journey;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Smoothing the raw scroll is what turns "scrubbing" into "camera work". */
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  return (
    <section
      id="journey"
      ref={ref}
      className="relative bg-paper-200"
      /* 5 acts × ~1 viewport of scroll each, plus room to settle. */
      style={{ height: reduced ? "auto" : "560vh" }}
    >
      {/* ── The pinned stage ── */}
      <div className="journey-stage sticky top-0 h-screen overflow-hidden">
        {/* City */}
        <div className="absolute inset-0">
          <CityScene progress={progress} />
        </div>

        {/* Vignette — pushes the eye toward the centre, keeps text legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 50%, rgba(246,245,240,0) 38%, rgba(246,245,240,0.55) 78%, rgba(246,245,240,0.9) 100%)",
          }}
        />
        {/* Left scrim so copy always sits on a calm ground */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(246,245,240,0.96) 0%, rgba(246,245,240,0.88) 40%, rgba(246,245,240,0) 100%)",
          }}
        />

        {/* Copy panels */}
        <div className="relative h-full container-x flex items-center">
          <div className="relative w-full max-w-[520px]">
            {j.acts.map((act, i) => (
              <ActPanel
                key={i}
                progress={progress}
                window={ACT_WINDOWS[i]}
                act={act}
                total={j.acts.length}
              />
            ))}
          </div>
        </div>

        {/* Phone HUD */}
        <JourneyHUD progress={progress} />

        {/* Progress rail */}
        <ProgressRail progress={progress} total={j.acts.length} />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   One act of copy, cross-fading on its window
────────────────────────────────────────────── */
interface Act {
  step: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
}

function ActPanel({
  progress,
  window: [from, to],
  act,
}: {
  progress: MotionValue<number>;
  window: [number, number];
  act: Act;
  total: number;
}) {
  /* Fade in over the first ~25% of the window, out over the last ~25%. */
  const span = to - from;
  const inEnd = from + span * 0.3;
  const outStart = to - span * 0.22;

  const opacity = useTransform(
    progress,
    [from - 0.02, inEnd, outStart, to],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [from - 0.02, inEnd, outStart, to], [28, 0, 0, -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="journey-act absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="font-display font-extrabold text-[13px] text-ocean tabular-nums">
          {act.step}
        </span>
        <span className="block w-6 h-px bg-ink-300" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink-500">
          {act.eyebrow}
        </span>
      </div>

      <h2 className="display text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.0] tracking-[-0.03em] mb-6">
        {act.title}{" "}
        <span className="text-ocean">{act.titleAccent}</span>
      </h2>

      <p className="text-[16px] lg:text-[18px] text-ink-500 leading-[1.6] max-w-md">
        {act.body}
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   A thin rail that shows how far into the drive you are
────────────────────────────────────────────── */
function ProgressRail({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20">
      <div className="relative w-px h-40 bg-ink/12 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-full bg-ocean origin-top"
          style={{ scaleY }}
        />
      </div>
      <span className="text-[10px] font-medium tabular-nums text-ink-400 [writing-mode:vertical-rl]">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
