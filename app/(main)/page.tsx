import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

function SectionSkeleton() {
  return <div className="min-h-[60vh]" />;
}

const CoreServices = dynamic(() => import("@/components/sections/CoreServices"), {
  loading: SectionSkeleton,
});
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
  loading: SectionSkeleton,
});
const TheFacelift = dynamic(() => import("@/components/sections/TheFacelift"), {
  loading: SectionSkeleton,
});
const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  loading: SectionSkeleton,
});
const Comparison = dynamic(() => import("@/components/sections/Comparison"), {
  loading: SectionSkeleton,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: SectionSkeleton,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: SectionSkeleton,
});

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
