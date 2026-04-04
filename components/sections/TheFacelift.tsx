"use client";

import React, { useState, useEffect, useMemo } from "react";
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

function StepArrow() {
  return (
    <div className="hidden lg:flex shrink-0 items-center justify-center self-center" aria-hidden>
      <div className="step-arrow-nudge flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="#00FF88"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function TheFacelift() {
  const mobile = useIsMobile();
  const [desktopRef, desktopInView] = useInView<HTMLDivElement>();
  const [mobileRef, mobileInView] = useInView<HTMLDivElement>();
  const [tilesKey, setTilesKey] = useState(0);
  const [tilesRef, tilesInView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  const stagger = useMemo(() => staggerContainer(mobile), [mobile]);

  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail?.id === "facelift") {
        setTilesKey((k) => k + 1);
      }
    };
    window.addEventListener("nav-scroll", handler);
    return () => window.removeEventListener("nav-scroll", handler);
  }, []);

  return (
    <SectionWrapper
      id="facelift"
      className="section-viewport px-4 pt-10 pb-8 sm:px-6 sm:py-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col items-center text-center gap-3 sm:mb-8">
          <SectionHeader label="Workflow" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-foreground-muted sm:text-base">
            A proven four-step process that takes your brand from concept to a
            high-performing digital presence.
          </p>
        </div>

        {/* Desktop: horizontal row with arrows */}
        <motion.div
          ref={desktopRef}
          initial="hidden"
          animate={desktopInView ? "visible" : "hidden"}
          variants={stagger}
          className="hidden lg:flex items-stretch gap-3"
        >
          {THE_FACELIFT_STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <motion.div variants={fadeUpScale(false)} className="flex flex-1">
                <StepCard step={step} />
              </motion.div>
              {i < THE_FACELIFT_STEPS.length - 1 && <StepArrow />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile: single column; Tablet: 2-col grid */}
        <motion.div
          ref={mobileRef}
          variants={stagger}
          initial="hidden"
          animate={mobileInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-3 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:hidden"
        >
          {THE_FACELIFT_STEPS.map((step) => (
            <StepCardAnimated key={step.number} step={step} mobile={mobile} />
          ))}
        </motion.div>

        {/* Tech stack tiles — key bumps on nav-scroll to replay entrance */}
        <motion.div
          key={tilesKey}
          ref={tilesRef}
          variants={stagger}
          initial="hidden"
          animate={tilesInView ? "visible" : "hidden"}
          className="mt-6 sm:mt-12"
        >
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-foreground-subtle sm:mb-6 sm:text-sm">
            Powered by
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
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
      className="relative flex flex-1 flex-col overflow-hidden rounded-[20px] bg-white p-4 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[28px] sm:p-5 lg:rounded-[32px] lg:p-6 transition-shadow duration-300 md:hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
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
      className="relative flex flex-col overflow-hidden rounded-[20px] bg-white p-4 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[28px] sm:p-5 lg:rounded-[32px] lg:p-6 transition-shadow duration-300 md:hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
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
        fontSize: "clamp(2rem, 6vw, 5rem)",
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
      <h3 className="mt-2 text-base sm:text-lg lg:text-xl font-bold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-[0.9375rem] leading-relaxed text-foreground-muted">
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
  const entranceDur = mobile ? 0.5 : 0.7;
  const staggerDelay = floatIndex * (mobile ? 0.1 : 0.09) + (mobile ? 0.08 : 0.04);
  const floatStartDelay = entranceDur + staggerDelay;

  const tileVariants = {
    hidden: { opacity: 0, y: mobile ? 6 : 10, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: entranceDur, ease: TILE_EASE },
    },
  };

  return (
    <motion.div variants={tileVariants}>
      <div
        className="tile-float group flex h-[52px] w-[52px] sm:h-[80px] sm:w-[80px] lg:h-[100px] lg:w-[100px] cursor-default flex-col items-center justify-center gap-0.5 sm:gap-2 rounded-[12px] sm:rounded-[20px] bg-[#f5f5f5] ring-1 ring-black/[0.07] transition-shadow duration-300 md:hover:shadow-[0_16px_40px_rgba(0,255,136,0.18),0_4px_12px_rgba(0,0,0,0.08)]"
        style={{
          "--float-dur": `${dur}s`,
          "--float-delay": `${floatStartDelay.toFixed(2)}s`,
        } as React.CSSProperties}
      >
        <div className="relative h-5 w-5 shrink-0 sm:h-8 sm:w-8 lg:h-10 lg:w-10">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
          />
        </div>
        <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-foreground/50 transition-colors group-hover:text-foreground/70">
          {tool.name}
        </span>
      </div>
    </motion.div>
  );
}
