"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPARISON } from "@/lib/constants";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { XIcon } from "@/components/icons/CheckIcon";
import { CARD_SHADOW } from "@/lib/design-tokens";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

export default function Comparison() {
  return (
    <SectionWrapper
      id="why-us"
      direction="left"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1 }}
          className="mb-10 flex justify-center sm:mb-14"
        >
          <SectionHeader label="Comparison" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[40px] bg-white ring-1 ring-inset ring-black/[0.07]"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="grid md:grid-cols-2">

            {/* ── Left: Other Agencies ── */}
            <div className="border-b border-black/[0.06] p-7 md:border-b-0 md:border-r md:p-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/40">
                  <XIcon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold tracking-tight text-foreground/50">
                  Other Agencies
                </h3>
              </div>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
              >
                {COMPARISON.otherAgencies.map((text) => (
                  <motion.li
                    key={text}
                    variants={rowVariants}
                    className="flex gap-3 text-[0.9375rem] text-foreground/40"
                  >
                    <span className="mt-0.5 shrink-0 text-foreground/25">
                      <XIcon className="h-5 w-5" />
                    </span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* ── Right: Facelift Labs ── */}
            <div className="relative p-7 md:p-10">
              {/* Subtle accent top bar */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-tr-[40px]" />

              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/20">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <Image
                  src="/logos/facelift-labs-logo.svg"
                  alt="Facelift Labs"
                  width={140}
                  height={24}
                  className="h-[22px] w-auto"
                  loading="lazy"
                />
              </div>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
              >
                {COMPARISON.faceliftLabs.map((text) => (
                  <motion.li
                    key={text}
                    variants={rowVariants}
                    className="flex gap-3 text-[0.9375rem] text-foreground-muted"
                  >
                    <span className="mt-0.5 shrink-0 text-accent">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
