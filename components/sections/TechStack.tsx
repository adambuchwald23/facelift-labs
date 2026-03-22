"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK_ITEMS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

/* Entrance: fade + scale only (no y — avoids conflict with float) */
const tileVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Each tile gets its own float rhythm so they drift independently */
const floatParams = [
  { y: [-4, 4],  duration: 3.2 },
  { y: [-6, 3],  duration: 3.8 },
  { y: [-3, 6],  duration: 4.1 },
  { y: [-5, 3],  duration: 3.5 },
  { y: [-4, 5],  duration: 4.4 },
  { y: [-6, 4],  duration: 3.0 },
  { y: [-3, 5],  duration: 3.7 },
];

export default function TechStack() {
  return (
    <SectionWrapper
      id="tech-stack"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1 }}
          className="mb-12 flex justify-center sm:mb-16"
        >
          <SectionHeader label="Tech Stack" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
  const fp = floatParams[floatIndex % floatParams.length];

  return (
    /* Outer: entrance fade/scale via stagger variants */
    <motion.div variants={tileVariants}>
      {/* Inner: owns all y movement — float + hover — no conflict */}
      <motion.div
        animate={{ y: fp.y }}
        transition={{
          y: {
            duration: fp.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatIndex * 0.3,
          },
        }}
        whileHover={{
          y: -12,
          scale: 1.1,
          transition: { type: "spring", stiffness: 320, damping: 20 },
        }}
        whileTap={{ scale: 0.95 }}
        className="group flex h-[120px] w-[120px] cursor-default flex-col items-center justify-center gap-3 rounded-[28px] bg-[#f5f5f5] ring-1 ring-black/[0.07] hover:shadow-[0_16px_40px_rgba(0,255,136,0.18),0_4px_12px_rgba(0,0,0,0.08)] sm:h-[132px] sm:w-[132px]"
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
      </motion.div>
    </motion.div>
  );
}
