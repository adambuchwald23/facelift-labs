"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/**
 * Global click interceptor — catches all anchor links pointing to #id
 * and applies the custom smooth scroll instead of native jump.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      smoothScrollTo(target);
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
