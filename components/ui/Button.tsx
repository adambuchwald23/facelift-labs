"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smooth-scroll";

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
  "inline-flex items-center justify-center gap-2 sm:gap-3 rounded-[25px] px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold transition-all duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

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
    const isHash = href.startsWith("#");

    const handleClick = isHash
      ? (e: React.MouseEvent) => {
          e.preventDefault();
          onClick?.();
          const el = document.getElementById(href.slice(1));
          if (el) {
            window.dispatchEvent(new CustomEvent("nav-lock"));
            smoothScrollTo(el, undefined, () => {
              window.dispatchEvent(
                new CustomEvent("nav-unlock", { detail: { href } }),
              );
            });
          }
        }
      : onClick;

    return (
      <Link href={href} className={cn(classes, "md:[transform:translateZ(0)] md:hover:scale-[1.02] md:active:scale-[0.98]")} onClick={handleClick}>
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
