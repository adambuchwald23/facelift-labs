import Hero from "@/components/sections/Hero";
import CoreServices from "@/components/sections/CoreServices";
import Portfolio from "@/components/sections/Portfolio";
import TheFacelift from "@/components/sections/TheFacelift";
import TechStack from "@/components/sections/TechStack";
import Comparison from "@/components/sections/Comparison";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

/**
 * Single-page landing: Hero → Services → Portfolio → Workflow
 * → Tech Stack → Why Us → FAQ → Contact. Footer in root layout.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <CoreServices />
      <Portfolio />
      <TheFacelift />
      <TechStack />
      <Comparison />
      <FAQ />
      <Contact />
    </main>
  );
}
