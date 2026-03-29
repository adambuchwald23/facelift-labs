"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-3 rounded-[25px] px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants = {
  primary:
    "border border-foreground bg-accent text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:brightness-110",
  outline:
    "border border-accent bg-transparent text-foreground hover:bg-accent/10",
} as const;

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cn(classes, "hover:scale-[1.02] active:scale-[0.98]")} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-60 pointer-events-none")}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
