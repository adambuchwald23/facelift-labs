"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NavTabProps {
  text: string;
  href: string;
  selected: boolean;
  tabRef: (el: HTMLButtonElement | null) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavTab = React.memo(function NavTab({
  text,
  href,
  selected,
  tabRef,
  onClick,
}: NavTabProps) {
  return (
    <button
      ref={tabRef}
      type="button"
      data-href={href}
      aria-current={selected ? "true" : undefined}
      onClick={onClick}
      className={cn(
        "relative z-10 w-fit cursor-pointer rounded-full bg-transparent px-4 py-2 text-sm font-medium capitalize outline-none focus-visible:outline-none",
        "transition-colors duration-200",
        selected
          ? "text-foreground"
          : "text-foreground-muted hover:text-foreground",
      )}
    >
      {text}
    </button>
  );
});
