"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { THE_FACELIFT_STEPS } from "@/lib/constants";
import { CARD_SHADOW } from "@/lib/design-tokens";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.45, delayChildren: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

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
  return (
    <SectionWrapper
      id="facelift"
      direction="right"
      className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex justify-center sm:mb-14">
          <SectionHeader label="Workflow" />
        </div>

        {/* Desktop: flex row with arrows — staggered pop-up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.45, delayChildren: 0.4 } } }}
          className="hidden lg:flex items-stretch gap-3"
        >
          {THE_FACELIFT_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 36, scale: 0.94 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } },

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
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden"
        >
          {THE_FACELIFT_STEPS.map((step) => (
            <StepCardAnimated key={step.number} step={step} />
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
    <motion.article
      whileHover={{ y: -6, boxShadow: "0 20px 50px -12px rgba(0,255,136,0.18), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative flex flex-1 flex-col overflow-hidden rounded-[28px] bg-white p-6 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-7"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <NumberWatermark number={step.number} />
      <StepContent step={step} />
    </motion.article>
  );
}

/** Mobile/tablet card — uses parent container stagger */
function StepCardAnimated({ step }: { step: Step }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: "0 20px 50px -12px rgba(0,255,136,0.18), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-6 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-7"
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
        fontSize: "clamp(4.5rem, 10vw, 6.5rem)",
        letterSpacing: "-0.05em",
        lineHeight: 1,
        color: "transparent",
        background: "linear-gradient(180deg, rgba(0,255,136,0.45) 0%, rgba(0,255,136,0.15) 100%)",
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
      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
        {step.description}
      </p>
    </>
  );
}
