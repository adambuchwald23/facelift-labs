"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Slight variation for entrance: "up" | "left" | "right" */
  direction?: "up" | "left" | "right";
}

const directionOffset = {
  up:    { y: 32, x: 0  },
  left:  { y: 16, x: -24 },
  right: { y: 16, x: 24  },
};

/**
 * Wraps a section with scroll-triggered fade + slide animation (play once).
 * scroll-mt-24 ensures sections clear the sticky navbar when anchor-linked.
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  direction = "up",
}: SectionWrapperProps) {
  const offset = directionOffset[direction];
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      /* scroll-mt-24 = 96px — keeps section below the sticky navbar on anchor nav */
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
