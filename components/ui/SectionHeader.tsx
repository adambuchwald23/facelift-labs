"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  className?: string;
}

/**
 * Pill-style section label with green border — used for Portfolio, Core Services, The Facelift, etc.
 */
export default function SectionHeader({ label, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center justify-center rounded-[100px] border-2 border-accent px-8 py-3 ${className}`}
    >
      <span className="text-2xl font-bold text-foreground">{label}</span>
    </motion.div>
  );
}
