"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK_ITEMS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const FLOAT_DURATIONS = [3.2, 3.8, 4.1, 3.5, 4.4, 3.0, 3.7];

const SPREAD_X = ["-30px", "-16px", "16px", "30px", "-24px", "0px", "24px"];

export default function TechStack() {
  return (
    <SectionWrapper
      id="tech-stack"
      className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex justify-center sm:mb-16">
          <SectionHeader label="Tech Stack" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="flex flex-col items-center gap-7 sm:gap-8"
        >
          {/* Row 1 — 4 items */}
          <div className="flex flex-wrap justify-center gap-7 sm:gap-8">
            {TECH_STACK_ITEMS.slice(0, 4).map((tool, i) => (
              <Tile key={tool.name} tool={tool} floatIndex={i} />
            ))}
          </div>

          {/* Row 2 — 3 items */}
          <div className="flex flex-wrap justify-center gap-7 sm:gap-8">
            {TECH_STACK_ITEMS.slice(4).map((tool, i) => (
              <Tile key={tool.name} tool={tool} floatIndex={i + 4} />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function Tile({
  tool,
  floatIndex,
}: {
  tool: { name: string; logo: string };
  floatIndex: number;
}) {
  const dur = FLOAT_DURATIONS[floatIndex % FLOAT_DURATIONS.length];
  const spreadX = SPREAD_X[floatIndex % SPREAD_X.length];

  const tileVariants = {
    hidden: { opacity: 0, y: 30, x: spreadX, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      x: "0px",
      scale: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div variants={tileVariants}>
      <div
        className="tile-float group flex h-[120px] w-[120px] cursor-default flex-col items-center justify-center gap-3 rounded-[28px] bg-[#f5f5f5] ring-1 ring-black/[0.07] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,255,136,0.18),0_4px_12px_rgba(0,0,0,0.08)] sm:h-[132px] sm:w-[132px]"
        style={{
          "--float-dur": `${dur}s`,
          "--float-delay": `${floatIndex * 0.3}s`,
        } as React.CSSProperties}
      >
        <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            fill
            className="object-contain"
            sizes="56px"
          />
        </div>
        <span className="text-[0.7rem] font-semibold tracking-wide text-foreground/50 transition-colors group-hover:text-foreground/70">
          {tool.name}
        </span>
      </div>
    </motion.div>
  );
}
