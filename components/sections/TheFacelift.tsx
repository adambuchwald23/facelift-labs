"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { THE_FACELIFT_STEPS } from "@/lib/constants";
import { CARD_SHADOW } from "@/lib/design-tokens";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Animated chevron arrow between cards — nudges right to reinforce journey flow */
function StepArrow() {
  return (
    <div className="hidden lg:flex shrink-0 items-center justify-center self-center px-1">
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default function TheFacelift() {
  return (
    <SectionWrapper
      id="facelift"
      direction="right"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1 }}
          className="mb-10 flex justify-center sm:mb-14"
        >
          <SectionHeader label="Workflow" />
        </motion.div>

        {/* Desktop: flex row with arrows — staggered pop-up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25, delayChildren: 0.15 } } }}
          className="hidden lg:flex items-stretch gap-3"
        >
          {THE_FACELIFT_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="flex flex-1 items-stretch gap-3"
            >
              <StepCard step={step} />
              {i < THE_FACELIFT_STEPS.length - 1 && <StepArrow />}
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / tablet grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden"
        >
          {THE_FACELIFT_STEPS.map((step, i) => (
            <StepCardAnimated key={step.number} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

type Step = (typeof THE_FACELIFT_STEPS)[number];

/** Desktop card — animation handled by parent stagger */
function StepCard({ step }: { step: Step }) {
  return (
    <article
      className="relative flex flex-1 flex-col overflow-hidden rounded-[40px] bg-white p-7 ring-[1px] ring-inset ring-black/[0.07]"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <NumberWatermark number={step.number} />
      <StepContent step={step} />
    </article>
  );
}

/** Mobile/tablet card — uses parent container stagger */
function StepCardAnimated({ step, index }: { step: Step; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      className="relative flex flex-col overflow-hidden rounded-[40px] bg-white p-7 ring-[1px] ring-inset ring-black/[0.07]"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <NumberWatermark number={step.number} />
      <StepContent step={step} />
    </motion.article>
  );
}

/** Giant outlined step number — the Figma-inspired watermark */
function NumberWatermark({ number }: { number: string }) {
  return (
    <div
      aria-hidden
      className="select-none font-black leading-none"
      style={{
        fontSize: "clamp(4.5rem, 10vw, 6.5rem)",
        letterSpacing: "-0.05em",
        lineHeight: 1,
        /* Fully filled accent color */
        color: "#00FF88",
      }}
    >
      {number}
    </div>
  );
}

function StepContent({ step }: { step: Step }) {
  return (
    <>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
        {step.description}
      </p>
    </>
  );
}
