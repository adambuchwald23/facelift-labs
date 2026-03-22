"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

/**
 * Primary (green fill) or outline (green border) button with subtle hover animation.
 * When two CTAs sit side by side (e.g. hero), give both the same min-width (e.g. min-w-[18rem])
 * so pill outlines are equal length and consistent across the page.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-3 rounded-[25px] px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const primary =
    "border border-foreground bg-accent text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]";
  const outline =
    "border border-accent bg-transparent text-foreground hover:bg-accent/10 active:scale-[0.98]";

  const combined = `${base} ${variant === "primary" ? primary : outline} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combined} ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
