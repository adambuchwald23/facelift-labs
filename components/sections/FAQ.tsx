"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_ITEMS, FAQ_CTA_LABEL } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { CARD_SHADOW } from "@/lib/design-tokens";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.45, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(
    FAQ_ITEMS.length > 0 ? 0 : null
  );

  return (
    <SectionWrapper id="faq" className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl">

        {/* Centered header */}
        <div className="mb-10 flex flex-col items-center text-center gap-3 sm:mb-14">
          <SectionHeader label="FAQ" />
          <p className="mx-auto max-w-md text-base leading-relaxed text-foreground-muted">
            Everything you need to know about working with us.
          </p>
        </div>

        {/* FAQ items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -40% 0px" }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="overflow-hidden rounded-[24px] bg-white border border-black/20"
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

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-foreground"
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
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-black/[0.06] px-6 pb-5 pt-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA — natural end to the section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px" }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
