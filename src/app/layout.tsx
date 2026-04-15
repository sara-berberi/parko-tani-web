import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: "Parko Tani — Gjej parkim menjëherë në Tiranë",
  description:
    "Parko Tani është një mënyrë më e lehtë për të gjetur parkim në Tiranë. Gjej, rezervo dhe parko — menjëherë. Find, reserve, and park instantly in Tirana.",
  keywords: [
    "parkim",
    "parking",
    "Tiranë",
    "Tirana",
    "parko tani",
    "parking app",
    "Albania",
    "Shqipëri",
    "rezervo parkim",
    "real-time parking",
  ],
  openGraph: {
    title: "Parko Tani — Gjej parkim menjëherë",
    description: "Aplikacioni i zgjuar për parkimin në Tiranë.",
    type: "website",
    locale: "sq_AL",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
