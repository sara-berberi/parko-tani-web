"use client";

import { Navbar } from "@/components/Navbar";
import { JourneyIntro } from "@/components/journey/JourneyIntro";
import { Journey } from "@/components/journey/Journey";
import { JourneyOutro } from "@/components/journey/JourneyOutro";
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
        {/* The drive: title card → pinned scroll story → landing */}
        <JourneyIntro />
        <Journey />
        <JourneyOutro />

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
