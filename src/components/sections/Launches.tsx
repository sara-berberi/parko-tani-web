"use client";

import { motion } from "framer-motion";

type Variant = "dark" | "medium" | "light";

interface SlideData {
  eyebrow: string;
  h1: string;
  h2: string;
  h2dim?: boolean;
  sub: string;
  chips: string[];
  variant: Variant;
  img: string;
}

const slides: SlideData[] = [
  {
    eyebrow: "Parko Tani · Tiranë",
    h1: "Jo më xhiro.",
    h2: "Thjesht parko.",
    h2dim: true,
    sub: "Shih çdo vend të lirë live — para se të nisesh nga shtëpia.",
    chips: ["Harta live", "Rezervim instant", "Falas"],
    variant: "dark",
    img: "/launches/13.jpeg",
  },
  {
    eyebrow: "Gjetja",
    h1: "Gjej parking",
    h2: "afër teje.",
    h2dim: true,
    sub: "Shiko çmimin, distancën dhe vendet e lira — me një shikim.",
    chips: ["250 ALL/hr", "20 / 20 vende", "3.0 km"],
    variant: "medium",
    img: "/launches/3.jpeg",
  },
  {
    eyebrow: "Për pronarët",
    h1: "Ti kontrollon.",
    h2: "Gjithmonë.",
    sub: "Shih makinat në pritje. Konfirmo me një klik.",
    chips: ["Njoftim automatik", "Konfirmo në sekonda"],
    variant: "light",
    img: "/launches/7.jpeg",
  },
  {
    eyebrow: "Rezervimet e tua",
    h1: "Gjithçka",
    h2: "nën kontroll.",
    h2dim: true,
    sub: "Historia e plotë e rezervimeve. Gjithmonë në dorën tënde.",
    chips: ["Sot", "7 ditët e fundit", "Të gjitha"],
    variant: "dark",
    img: "/launches/1.jpeg",
  },
  {
    eyebrow: "Dashboard",
    h1: "Fito nga",
    h2: "vendi yt.",
    sub: "Prano rezervime. Menaxho parking-un tënd. Fito çdo muaj.",
    chips: ["Prano me 1 klik", "disa parkime njëherësh"],
    variant: "medium",
    img: "/launches/12.jpeg",
  },
];

const bg: Record<Variant, string> = {
  dark: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(37,99,168,0.2), transparent 60%), linear-gradient(180deg, #0a1428 0%, #050a18 100%)",
  medium:
    "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(147,197,253,0.25), transparent 65%), linear-gradient(180deg, #1e4d92 0%, #133566 100%)",
  light:
    "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,255,255,0.4), transparent 65%), linear-gradient(180deg, #93c5fd 0%, #4a90e2 100%)",
};

/** Slides 1–2 — full iPhone mockup layout, one per row */
export function LaunchesTop() {
  return (
    <section className="section-y bg-paper hairline-t">
      <div className="container-x space-y-10 md:space-y-14">
        {slides.slice(0, 2).map((s, i) => (
          <SlideWithPhone key={i} data={s} index={i} flip={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}

/** Full-width card: gradient bg + copy left/right + iPhone mockup on the other side */
function SlideWithPhone({
  data,
  index,
  flip,
}: {
  data: SlideData;
  index: number;
  flip: boolean;
}) {
  const { eyebrow, h1, h2, h2dim, sub, chips, variant, img } = data;
  const isLight = variant === "light";
  const textPrimary = isLight ? "#0a1e46" : "#ffffff";
  const textMuted = isLight ? "rgba(10,30,70,0.7)" : "rgba(255,255,255,0.7)";
  const eyebrowColor = isLight ? "rgba(10,30,70,0.5)" : "rgba(255,255,255,0.5)";
  const dimColor = isLight ? "rgba(10,30,70,0.4)" : "rgba(255,255,255,0.4)";
  const chipBg = isLight ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)";
  const chipBorder = isLight
    ? "rgba(255,255,255,0.7)"
    : "rgba(255,255,255,0.22)";
  const chipText = isLight ? "#0a1e46" : "#ffffff";
  const brandAccent = isLight ? "#1848a0" : "#bfdbfe";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-[28px] overflow-hidden"
      style={{
        background: bg[variant],
        boxShadow:
          "0 24px 60px -16px rgba(11,18,32,0.22), 0 0 0 1px rgba(11,18,32,0.06)",
      }}
    >
      <div
        className={`flex flex-col md:flex-row items-center gap-0 ${flip ? "md:flex-row-reverse" : ""}`}
      >
        {/* Copy side */}
        <div className="flex-1 flex flex-col justify-center px-10 py-14 md:py-16 md:px-14 z-10">
          <div
            className="font-bold uppercase tracking-[0.22em] mb-5"
            style={{ fontSize: 11, color: eyebrowColor }}
          >
            {eyebrow}
          </div>
          <div
            className="font-display font-extrabold leading-[1.0] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", color: textPrimary }}
          >
            {h1}
            <br />
            <span
              style={
                h2dim
                  ? { color: dimColor, fontWeight: 700 }
                  : { color: brandAccent }
              }
            >
              {h2}
            </span>
          </div>
          <p
            className="leading-[1.6] mb-8 max-w-sm"
            style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: textMuted }}
          >
            {sub}
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <div
                key={c}
                className="rounded-full font-semibold"
                style={{
                  padding: "6px 14px",
                  fontSize: 12,
                  background: chipBg,
                  border: `1px solid ${chipBorder}`,
                  color: chipText,
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.02em",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* iPhone mockup side */}
        <div
          className="flex-shrink-0 flex items-end justify-center px-10 pb-0 pt-10 md:pt-0 md:px-12"
          style={{ width: "min(260px, 45%)" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute bottom-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{
              background: isLight ? "#4a90e2" : "#3b82f6",
              left: flip ? "auto" : "30%",
              right: flip ? "30%" : "auto",
            }}
          />
          <div
            className="relative w-full rounded-[40px] overflow-hidden"
            style={{
              aspectRatio: "9 / 19.5",
              background: "linear-gradient(180deg, #1c1c1e 0%, #0a0a0f 100%)",
              boxShadow:
                "0 40px 70px -20px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(255,255,255,0.1)",
              padding: "6px",
            }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 bg-black rounded-full"
              style={{ width: "34%", height: 24 }}
            />
            {/* Screen */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ borderRadius: 34 }}
            >
              <img
                src={img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Slides 3–5 + feature graphic — shown before Download */
export function LaunchesBottom() {
  return (
    <section className="section-y bg-paper hairline-t">
      <div className="container-x">
        {/* Feature graphic full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div
            className="relative w-full rounded-[20px] overflow-hidden"
            style={{
              aspectRatio: "1024 / 500",
              boxShadow:
                "0 24px 60px -16px rgba(11,18,32,0.2), 0 0 0 1px rgba(11,18,32,0.06)",
            }}
          >
            <img
              src="/launches/9.png"
              alt="Parko Tani — Google Play feature graphic"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Slides 3–5, 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {slides.slice(2).map((s, i) => (
            <SlideCard key={i} data={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideCard({ data, index }: { data: SlideData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Slide {...data} />
    </motion.div>
  );
}

function Slide({
  eyebrow,
  h1,
  h2,
  h2dim,
  sub,
  chips,
  variant,
  img,
}: SlideData) {
  const isLight = variant === "light";
  const textPrimary = isLight ? "#0a1e46" : "#ffffff";
  const textMuted = isLight ? "rgba(10,30,70,0.65)" : "rgba(255,255,255,0.65)";
  const eyebrowColor = isLight
    ? "rgba(10,30,70,0.55)"
    : "rgba(255,255,255,0.55)";
  const dimColor = isLight ? "rgba(10,30,70,0.4)" : "rgba(255,255,255,0.4)";
  const chipBg = isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)";
  const chipBorder = isLight
    ? "rgba(255,255,255,0.6)"
    : "rgba(255,255,255,0.2)";
  const chipText = isLight ? "#0a1e46" : "#ffffff";
  const brandAccent = isLight ? "#1848a0" : "#bfdbfe";
  const footText = isLight ? "rgba(10,30,70,0.5)" : "rgba(255,255,255,0.4)";

  return (
    <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
      <div
        className="absolute inset-0 rounded-[22px] overflow-hidden"
        style={{
          background: bg[variant],
          boxShadow:
            "0 24px 60px -16px rgba(11,18,32,0.25), 0 0 0 1px rgba(11,18,32,0.06)",
        }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[90%] pointer-events-none"
          style={{
            aspectRatio: "1",
            background: isLight
              ? "radial-gradient(circle, rgba(255,255,255,0.5), transparent 55%)"
              : "radial-gradient(circle, rgba(255,255,255,0.18), transparent 55%)",
            filter: "blur(10px)",
          }}
        />

        {/* Top copy */}
        <div
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-[9%]"
          style={{ paddingTop: "12%" }}
        >
          <div
            className="font-bold uppercase tracking-[0.22em] text-center"
            style={{
              fontSize: "clamp(7px, 0.85vw, 11px)",
              color: eyebrowColor,
              marginBottom: "5%",
            }}
          >
            {eyebrow}
          </div>
          <div
            className="font-display font-extrabold text-center leading-[1.05] tracking-[-0.035em]"
            style={{
              fontSize: "clamp(16px, 2.4vw, 28px)",
              color: textPrimary,
              marginBottom: "7%",
            }}
          >
            {h1}
            <br />
            <span
              style={
                h2dim
                  ? { color: dimColor, fontWeight: 700 }
                  : { color: brandAccent }
              }
            >
              {h2}
            </span>
          </div>
          <div
            className="text-center leading-[1.5] max-w-[92%]"
            style={{ fontSize: "clamp(9px, 0.95vw, 13px)", color: textMuted }}
          >
            {sub}
          </div>
        </div>

        {/* Phone frame with screenshot */}
        <div
          className="absolute z-[5] overflow-hidden"
          style={{
            left: "14%",
            right: "14%",
            top: "37%",
            bottom: "18%",
            borderRadius: "8px 8px 0 0",
            background: "#1a1a1f",
            boxShadow:
              "0 -2px 0 rgba(255,255,255,0.08) inset, 0 20px 40px -10px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(0,0,0,0.4)",
            padding: "5px 5px 0",
          }}
        >
          {/* notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{
              top: 6,
              width: "36%",
              height: 10,
              background: "#0a0a0f",
              borderRadius: "0 0 7px 7px",
            }}
          />
          <div
            className="absolute inset-[5px] bottom-0 overflow-hidden"
            style={{ borderRadius: "4px 4px 0 0" }}
          >
            <img
              src={img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Chips */}
        <div
          className="absolute inset-x-0 z-10 flex flex-wrap justify-center gap-[2%] px-[8%]"
          style={{ bottom: "9%" }}
        >
          {chips.map((c) => (
            <div
              key={c}
              className="rounded-full font-semibold whitespace-nowrap mb-[2%]"
              style={{
                padding: "3px 8px",
                fontSize: "clamp(7px, 0.78vw, 10px)",
                background: chipBg,
                border: `1px solid ${chipBorder}`,
                color: chipText,
                backdropFilter: "blur(8px)",
                letterSpacing: "0.02em",
              }}
            >
              {c}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-[9%]"
          style={{ paddingBottom: "4%", paddingTop: "2%" }}
        >
          <div
            className="font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(11px, 1.2vw, 15px)", color: textPrimary }}
          >
            Parko <span style={{ color: brandAccent }}>Tani</span>
          </div>
          <div
            className="font-semibold uppercase"
            style={{
              fontSize: "clamp(6px, 0.65vw, 8px)",
              letterSpacing: "0.14em",
              color: footText,
            }}
          >
            parkotani.com
          </div>
        </div>
      </div>
    </div>
  );
}
