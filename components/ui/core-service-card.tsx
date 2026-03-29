"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CARD_SHADOW } from "@/lib/design-tokens";

export type CoreServiceItem = {
  name: string;
  description: string;
  iconSrc: string;
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

export function CoreServicesGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -15% 0px" }}
      className={cn(
        "grid grid-cols-1 gap-8 sm:gap-9 md:grid-cols-3 md:gap-9",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CoreServiceCard({
  name,
  description,
  iconSrc,
  className,
}: CoreServiceItem & { className?: string }) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "relative flex min-h-[220px] flex-col items-start rounded-[28px] bg-white p-6 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]",
        className
      )}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* Accent icon pill */}
      <div
        className="inline-flex items-center justify-center rounded-2xl bg-accent/10 p-3 ring-1 ring-accent/20"
        aria-hidden
      >
        <div
          className="size-7 bg-accent"
          style={{
            maskImage: `url(${iconSrc})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(${iconSrc})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
        {description}
      </p>
    </motion.article>
  );
}
