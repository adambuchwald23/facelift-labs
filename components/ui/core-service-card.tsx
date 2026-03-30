"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CARD_SHADOW } from "@/lib/design-tokens";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeUp } from "@/lib/motion";

export type CoreServiceItem = {
  name: string;
  description: string;
  iconSrc: string;
};

export function CoreServicesGrid({
  children,
  className,
  mobile,
}: {
  children: React.ReactNode;
  className?: string;
  mobile: boolean;
}) {
  const [gridRef, gridInView] = useInView<HTMLDivElement>();
  return (
    <motion.div
      ref={gridRef}
      variants={staggerContainer(mobile)}
      initial="hidden"
      animate={gridInView ? "visible" : "hidden"}
      className={cn(
        "grid grid-cols-1 gap-3 sm:gap-9 md:grid-cols-3 md:gap-9",
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
  mobile,
}: CoreServiceItem & { className?: string; mobile: boolean }) {
  return (
    <motion.article
      variants={fadeUp(mobile)}
      className={cn(
        "relative flex min-h-0 sm:min-h-[220px] flex-col items-start rounded-[20px] bg-white p-4 ring-[1px] ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-8 transition-shadow duration-300 md:hover:shadow-[0_20px_50px_-12px_rgba(0,255,136,0.18),0_8px_24px_-8px_rgba(0,0,0,0.10)]",
        className
      )}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* Accent icon pill */}
      <div
        className="inline-flex items-center justify-center rounded-2xl bg-accent/10 p-2 sm:p-3 ring-1 ring-accent/20"
        aria-hidden
      >
        <div
          className="size-5 sm:size-7 bg-accent"
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

      <h3 className="mt-3 text-base sm:text-xl font-bold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted sm:text-[0.9375rem]">
        {description}
      </p>
    </motion.article>
  );
}
