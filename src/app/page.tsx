"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LaunchesTop } from "@/components/sections/Launches";
import { AppScreenshots } from "@/components/sections/AppScreenshots";
import { ForBusinesses } from "@/components/sections/ForBusinesses";
import { LaunchesBottom } from "@/components/sections/Launches";
import { Download } from "@/components/sections/Download";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <LaunchesTop />
        <AppScreenshots />
        <ForBusinesses />
        <LaunchesBottom />
        <Download />
      </main>
      <Footer />
    </>
  );
}
