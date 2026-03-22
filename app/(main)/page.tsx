import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import CoreServices from "@/components/sections/CoreServices";
import TheFacelift from "@/components/sections/TheFacelift";
import TechStack from "@/components/sections/TechStack";
import Comparison from "@/components/sections/Comparison";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

/**
 * Single-page landing: Hero → Portfolio → Core Services → The Facelift
 * → Tech Stack → Comparison → FAQ → Contact. Footer in root layout.
 *
 * Sections are imported normally (not dynamic + ssr:false) so the server
 * sends real HTML on first paint. Relying only on client-only placeholders
 * leaves the page empty/broken if JS is slow, blocked, or errors.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <CoreServices />
      <TheFacelift />
      <TechStack />
      <Comparison />
      <FAQ />
      <Contact />
    </main>
  );
}
