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
  up:    { y: 16, x: 0  },
  left:  { y: 8,  x: -12 },
  right: { y: 8,  x: 12  },
};

/**
 * Wraps a section with scroll-triggered slide animation (play once).
 * Only animates position — opacity is handled by inner child elements
 * to avoid double-opacity issues on mobile viewports.
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
      initial={{ y: offset.y, x: offset.x }}
      whileInView={{ y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
