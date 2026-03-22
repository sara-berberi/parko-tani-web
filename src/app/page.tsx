"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LiveStats } from "@/components/sections/LiveStats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ForBusinesses } from "@/components/sections/ForBusinesses";
import { About } from "@/components/sections/About";
import { Download } from "@/components/sections/Download";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveStats />
        <HowItWorks />
        <ValueProposition />
        <ForBusinesses />
        <About />
        <Download />
      </main>
      <Footer />
    </>
  );
}
