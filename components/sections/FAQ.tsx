"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_ITEMS, FAQ_CTA_LABEL } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { CARD_SHADOW } from "@/lib/design-tokens";
import { useIsMobile } from "@/lib/use-mobile";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeUp, inlineEntrance } from "@/lib/motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const mobile = useIsMobile();
  const [listRef, listInView] = useInView<HTMLDivElement>();

  return (
    <SectionWrapper id="faq" className="flex min-h-[calc(100vh-5rem)] flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">

        <div className="mb-10 flex flex-col items-center text-center gap-3 sm:mb-14">
          <SectionHeader label="FAQ" />
          <p className="mx-auto max-w-md text-base leading-relaxed text-foreground-muted">
            Everything you need to know about working with us.
          </p>
        </div>

        <motion.div
          ref={listRef}
          variants={staggerContainer(mobile)}
          initial="hidden"
          animate={listInView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={faq.question}
                variants={fadeUp(mobile)}
                className="overflow-hidden rounded-[20px] bg-white border border-black/20 sm:rounded-[24px]"
                style={{ boxShadow: isOpen ? CARD_SHADOW : "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[0.9375rem] font-semibold tracking-tight transition-colors duration-200 ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                    {faq.question}
                  </span>

                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* CSS grid transition — no JS layout measurement needed */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-black/[0.06] px-6 pb-5 pt-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA — natural end to the section */}
        <motion.div
          variants={inlineEntrance(mobile)}
          initial="hidden"
          animate={listInView ? "visible" : "hidden"}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-foreground-muted">
            Still have questions? We&apos;d love to chat.
          </p>
          <Button href="#contact" variant="primary" className="!text-foreground">
            {FAQ_CTA_LABEL}
          </Button>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
