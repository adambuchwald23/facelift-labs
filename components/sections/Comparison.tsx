"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPARISON } from "@/lib/constants";
import { CheckIcon, XIcon } from "@/components/icons/CheckIcon";
import { CARD_SHADOW } from "@/lib/design-tokens";
import { useIsMobile } from "@/lib/use-mobile";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeInLeft, inlineEntrance } from "@/lib/motion";

export default function Comparison() {
  const mobile = useIsMobile();
  const rowVars = fadeInLeft(mobile);
  const listVars = staggerContainer(mobile);
  const entrance = inlineEntrance(mobile);

  const [cardRef, cardInView] = useInView<HTMLDivElement>();
  const [leftRef, leftInView] = useInView<HTMLUListElement>();
  const [rightRef, rightInView] = useInView<HTMLUListElement>();

  return (
    <SectionWrapper
      id="why-us"
      className="section-viewport px-4 pt-6 pb-8 sm:px-6 sm:py-12 md:pt-6 md:pb-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-center sm:mb-14">
          <SectionHeader label="Why Us" />
        </div>

        <motion.div
          ref={cardRef}
          variants={entrance}
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          className="overflow-hidden rounded-[28px] bg-white ring-1 ring-inset ring-black/[0.07] sm:rounded-[40px]"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="grid md:grid-cols-2">

            <div className="border-b border-black/[0.06] p-5 sm:p-7 md:border-b-0 md:border-r md:p-10">
              <div className="mb-5 sm:mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/40">
                  <XIcon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold tracking-tight text-foreground/50">
                  Other Agencies
                </h3>
              </div>
              <motion.ul
                ref={leftRef}
                variants={listVars}
                initial="hidden"
                animate={leftInView ? "visible" : "hidden"}
                className="space-y-4"
              >
                {COMPARISON.otherAgencies.map((text) => (
                  <motion.li
                    key={text}
                    variants={rowVars}
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

            <div className="relative p-5 sm:p-7 md:p-10">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 md:rounded-tr-[40px]" />

              <div className="mb-5 sm:mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/20">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <Image
                  src="/logos/facelift-labs-logo.svg"
                  alt="Facelift Labs"
                  width={140}
                  height={24}
                  className="h-[22px] w-auto"
                  sizes="140px"
                  loading="lazy"
                />
              </div>
              <motion.ul
                ref={rightRef}
                variants={listVars}
                initial="hidden"
                animate={rightInView ? "visible" : "hidden"}
                className="space-y-4"
              >
                {COMPARISON.faceliftLabs.map((text) => (
                  <motion.li
                    key={text}
                    variants={rowVars}
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
