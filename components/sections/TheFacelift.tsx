"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { THE_FACELIFT_STEPS, TECH_STACK_ITEMS } from "@/lib/constants";
import { CARD_SHADOW } from "@/lib/design-tokens";
import { useIsMobile } from "@/lib/use-mobile";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeUp, fadeUpScale } from "@/lib/motion";

const FLOAT_DURATIONS = [3.2, 3.8, 4.1, 3.5, 4.4, 3.0, 3.7];
const TILE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TheFacelift() {
  const mobile = useIsMobile();
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>();
  const [tilesRef, tilesInView] = useInView<HTMLDivElement>();

  return (
    <SectionWrapper
      id="facelift"
      className="section-viewport px-4 pt-6 pb-8 sm:px-6 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col items-center text-center gap-4 sm:mb-10">
          <SectionHeader label="Workflow" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-foreground-muted sm:text-base">
            A proven four-step process that takes your brand from concept to a
            high-performing digital presence.
          </p>
        </div>

        {/* Desktop: 2×2 grid */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={staggerContainer(false)}
          className="hidden lg:grid lg:grid-cols-2 gap-4"
        >
          {THE_FACELIFT_STEPS.map((step) => (
            <motion.div key={step.number} variants={fadeUpScale(false)}>
              <StepCard step={step} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / tablet: stacked or 2-col grid */}
        <motion.div
          variants={staggerContainer(mobile)}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:hidden"
        >
          {THE_FACELIFT_STEPS.map((step) => (
            <StepCardAnimated key={step.number} step={step} mobile={mobile} />
          ))}
        </motion.div>

        {/* Tech stack tiles — "Powered by" strip */}
        <motion.div
          ref={tilesRef}
          variants={staggerContainer(mobile)}
          initial="hidden"
          animate={tilesInView ? "visible" : "hidden"}
          className="mt-10 sm:mt-16"
        >
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-foreground-subtle sm:mb-8 sm:text-sm">
            Powered by
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {TECH_STACK_ITEMS.map((tool, i) => (
              <TechTile key={tool.name} tool={tool} floatIndex={i} mobile={mobile} />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type Step = (typeof THE_FACELIFT_STEPS)[number];

function StepCard({ step }: { step: Step }) {
  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-5 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-7 transition-shadow duration-300 md:hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <NumberWatermark number={step.number} />
      <StepContent step={step} />
    </article>
  );
}

function StepCardAnimated({ step, mobile }: { step: Step; mobile: boolean }) {
  return (
    <motion.article
      variants={fadeUp(mobile)}
      className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-5 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-7 transition-shadow duration-300 md:hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <NumberWatermark number={step.number} />
      <StepContent step={step} />
    </motion.article>
  );
}

function NumberWatermark({ number }: { number: string }) {
  return (
    <div
      aria-hidden
      className="select-none font-black leading-none"
      style={{
        fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
        letterSpacing: "-0.05em",
        lineHeight: 1,
        color: "transparent",
        background: "linear-gradient(180deg, rgba(0,255,136,0.75) 0%, rgba(0,255,136,0.35) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      {number}
    </div>
  );
}

function StepContent({ step }: { step: Step }) {
  return (
    <>
      <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
        {step.description}
      </p>
    </>
  );
}

function TechTile({
  tool,
  floatIndex,
  mobile,
}: {
  tool: { name: string; logo: string };
  floatIndex: number;
  mobile: boolean;
}) {
  const dur = FLOAT_DURATIONS[floatIndex % FLOAT_DURATIONS.length];

  const tileVariants = {
    hidden: { opacity: 0, y: mobile ? 6 : 10, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: mobile ? 0.5 : 0.7, ease: TILE_EASE },
    },
  };

  return (
    <motion.div variants={tileVariants}>
      <div
        className="tile-float group flex h-[76px] w-[76px] sm:h-[100px] sm:w-[100px] cursor-default flex-col items-center justify-center gap-1.5 sm:gap-2.5 rounded-[18px] sm:rounded-[24px] bg-[#f5f5f5] ring-1 ring-black/[0.07] transition-shadow duration-300 md:hover:shadow-[0_16px_40px_rgba(0,255,136,0.18),0_4px_12px_rgba(0,0,0,0.08)]"
        style={{
          "--float-dur": `${dur}s`,
          "--float-delay": `${floatIndex * 0.3}s`,
        } as React.CSSProperties}
      >
        <div className="relative h-8 w-8 shrink-0 sm:h-10 sm:w-10">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>
        <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-foreground/50 transition-colors group-hover:text-foreground/70">
          {tool.name}
        </span>
      </div>
    </motion.div>
  );
}
