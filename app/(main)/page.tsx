import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import CoreServices from "@/components/sections/CoreServices";

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const TheFacelift = dynamic(() => import("@/components/sections/TheFacelift"));
const Comparison = dynamic(() => import("@/components/sections/Comparison"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

/**
 * Single-page landing: Hero → Services → Portfolio → Workflow
 * → Why Us → FAQ → Contact. Footer in root layout.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <CoreServices />
      <Portfolio />
      <TheFacelift />
      <Comparison />
      <FAQ />
      <Contact />
    </main>
  );
}
