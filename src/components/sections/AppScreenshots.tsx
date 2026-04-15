"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { DeviceFrame } from "@/components/DeviceFrame";

export function AppScreenshots() {
  const { t } = useLanguage();

  return (
    <section
      id="app"
      className="relative bg-ink text-paper section-y overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-x relative">
        <div className="max-w-xl mb-20 md:mb-24">
          <div className="eyebrow mb-5 text-paper/50 before:bg-paper/30">
            {t.screenshots.eyebrow}
          </div>
          <h2 className="display text-display-md md:text-display-lg text-paper">
            {t.screenshots.title}{" "}
            <span className="text-ocean-300">{t.screenshots.titleAccent}</span>
          </h2>
          <p className="text-[16px] text-paper/60 mt-6 leading-relaxed max-w-lg">
            {t.screenshots.subtitle}
          </p>
        </div>

        {/* iPhone left, iPad center, Android right — all showing real screenshots */}
        <div className="relative grid grid-cols-12 gap-6 md:gap-10 items-end">
          {/* iPhone — slide 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="col-span-6 md:col-span-3 md:mb-20 relative"
          >
            <DeviceLabel variant="iOS" />
            <DeviceFrame variant="iphone">
              <ScreenImg src="/launches/14.jpeg" alt="iOS" />
            </DeviceFrame>
          </motion.div>

          {/* iPad — slide 4 (wider content looks better on tablet) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="col-span-12 md:col-span-6 order-first md:order-none"
          >
            <DeviceLabel variant="iPadOS" />
            <DeviceFrame variant="ipad">
              <ScreenImg src="/launches/11.jpeg" alt="iPadOS" fit="cover" />
            </DeviceFrame>
          </motion.div>

          {/* Android — slide 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="col-span-6 md:col-span-3 md:mb-20 relative"
          >
            <DeviceLabel variant="Android" />
            <DeviceFrame variant="android">
              <ScreenImg src="/launches/5.jpeg" alt="Android" />
            </DeviceFrame>
          </motion.div>
        </div>

        <div className="mt-16 text-[13px] text-paper/40 text-center">
          {t.screenshots.screen1Caption}
        </div>
      </div>
    </section>
  );
}

function DeviceLabel({ variant }: { variant: string }) {
  return (
    <div className="absolute -top-6 left-0 text-[10px] tracking-[0.2em] uppercase text-paper/40 font-medium">
      {variant}
    </div>
  );
}

function ScreenImg({
  src,
  alt,
  fit = "cover",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full"
      style={{ objectFit: fit, objectPosition: "top center" }}
    />
  );
}
