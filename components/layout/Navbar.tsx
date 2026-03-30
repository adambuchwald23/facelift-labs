"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { NavTab } from "@/components/ui/nav-tab";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const firstActivationRef = useRef(true);
  const clickLockRef = useRef(false);
  const clickLockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeHrefRef = useRef(activeHref);
  const scrolledRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    activeHrefRef.current = activeHref;
  }, [activeHref]);

  // Clear timers on unmount to prevent memory leaks / stale callbacks.
  useEffect(() => {
    return () => {
      clearTimeout(clickLockTimer.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (clickLockRef.current) return;
      const hash = window.location.hash || "";
      if (NAV_LINKS.some((l) => l.href === hash)) {
        setActiveHref(hash);
      } else if (!hash) {
        setActiveHref("");
      }
    };
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const detectActiveSection = useCallback(() => {
    const sy = window.scrollY;
    if (sy < 100) {
      if (activeHrefRef.current !== "") setActiveHref("");
      activeHrefRef.current = "";
      return;
    }
    const threshold = 120;
    let active = "";
    for (const link of NAV_LINKS) {
      const el = document.getElementById(link.href.slice(1));
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) {
        active = link.href;
      }
    }
    const contactEl = document.getElementById("contact");
    if (contactEl && contactEl.getBoundingClientRect().top <= threshold) {
      active = "";
    }
    if (active !== activeHrefRef.current) setActiveHref(active);
    activeHrefRef.current = active;
  }, []);

  // Single rAF-throttled scroll listener for both scrolled state and active section.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const sy = window.scrollY;
      const nowScrolled = sy > 20;
      if (nowScrolled !== scrolledRef.current) setScrolled(nowScrolled);
      scrolledRef.current = nowScrolled;

      if (clickLockRef.current) return;
      detectActiveSection();
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [detectActiveSection]);

  // Lock pill during CTA-driven scrolls (hero buttons, Contact Us, etc.)
  useEffect(() => {
    const onLock = () => {
      clickLockRef.current = true;
      clearTimeout(clickLockTimer.current);
      setActiveHref("");
      activeHrefRef.current = "";
    };

    const onUnlock = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail?.href;
      const isNavSection = NAV_LINKS.some((l) => l.href === href);

      if (isNavSection) {
        setActiveHref(href);
        activeHrefRef.current = href;
      }

      clickLockTimer.current = setTimeout(() => {
        clickLockRef.current = false;
      }, 300);
    };

    window.addEventListener("nav-lock", onLock);
    window.addEventListener("nav-unlock", onUnlock);
    return () => {
      window.removeEventListener("nav-lock", onLock);
      window.removeEventListener("nav-unlock", onUnlock);
    };
  }, []);

  // Close mobile menu when the user starts scrolling.
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  // Position the pill via direct DOM writes so React never interferes.
  const positionPill = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const idx = NAV_LINKS.findIndex((l) => l.href === activeHrefRef.current);

    if (idx < 0 || !navRef.current || !tabRefs.current[idx]) {
      pill.style.setProperty("opacity", "0");
      firstActivationRef.current = true;
      return;
    }

    const tabEl = tabRefs.current[idx]!;
    const tabRect = tabEl.getBoundingClientRect();
    const contRect = navRef.current.getBoundingClientRect();
    const left = tabRect.left - contRect.left;
    const width = tabRect.width;

    if (firstActivationRef.current) {
      pill.style.setProperty("transition", "none");
      pill.style.setProperty("left", `${left}px`);
      pill.style.setProperty("width", `${width}px`);
      pill.style.setProperty("opacity", "1");
      firstActivationRef.current = false;
      requestAnimationFrame(() => {
        if (pillRef.current) pillRef.current.style.removeProperty("transition");
      });
    } else {
      pill.style.setProperty("left", `${left}px`);
      pill.style.setProperty("width", `${width}px`);
      pill.style.setProperty("opacity", "1");
    }
  }, []);

  useLayoutEffect(positionPill, [activeHref, positionPill]);

  // Reposition pill on window resize — rAF-throttled to avoid layout thrashing.
  useEffect(() => {
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        positionPill();
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeRaf);
    };
  }, [positionPill]);

  const handleNavClick = useCallback(
    (href: string) => () => {
      clickLockRef.current = true;
      clearTimeout(clickLockTimer.current);
      clickLockTimer.current = setTimeout(() => {
        clickLockRef.current = false;
      }, 2500);

      setActiveHref(href);
      activeHrefRef.current = href;
      positionPill();

      const id = href.startsWith("#") ? href.slice(1) : href;
      const el = document.getElementById(id);
      if (el) smoothScrollTo(el);
    },
    [positionPill],
  );

  const handleMobileNavClick = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileOpen(false);
      setActiveHref(href);
      activeHrefRef.current = href;

      clickLockRef.current = true;
      clearTimeout(clickLockTimer.current);
      clickLockTimer.current = setTimeout(() => {
        clickLockRef.current = false;
      }, 2500);

      const id = href.startsWith("#") ? href.slice(1) : href;
      const el = document.getElementById(id);
      if (el) smoothScrollTo(el);
    },
    [],
  );

  return (
    <header className="pointer-events-none sticky top-0 z-50 flex justify-center px-4 pt-3 pb-2.5 sm:pt-4 sm:pb-3.5 [transform:translateZ(0)] [will-change:transform]">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-[100px] px-3 py-2 border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${
          scrolled
            ? "bg-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-black/[0.06]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center md:flex-1">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveHref("");
              activeHrefRef.current = "";
              smoothScrollTo(document.body);
            }}
            className="block shrink-0 pl-1"
            style={{ maxWidth: 175 }}
          >
            <Image
              src="/logo.svg"
              alt="Facelift Labs"
              width={613}
              height={100}
              className="h-auto"
              style={{ width: "clamp(140px, 38vw, 175px)" }}
              priority
            />
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex" aria-label="Main navigation">
          <div ref={navRef} className="relative flex items-center rounded-full bg-black/[0.08] p-1">
            <div
              ref={pillRef}
              className="absolute inset-y-1 rounded-full bg-white shadow-sm ring-1 ring-black/[0.06] pointer-events-none opacity-0 [transition:left_0.35s_cubic-bezier(0.34,1.56,0.64,1),width_0.35s_cubic-bezier(0.34,1.56,0.64,1),opacity_0.15s_ease]"
            />
            {NAV_LINKS.map((link, i) => (
              <NavTab
                key={link.href}
                text={link.label}
                href={link.href}
                selected={activeHref === link.href}
                tabRef={(el) => { tabRefs.current[i] = el; }}
                onClick={handleNavClick(link.href)}
              />
            ))}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 pr-1 md:flex-1 md:justify-end">
          <div className="hidden shrink-0 md:block">
            <Button
              href="#contact"
              variant="primary"
              className="!px-5 !py-2 !text-sm !text-foreground"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] p-2 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "scale-x-0 opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="pointer-events-auto absolute left-4 right-4 top-[calc(100%+4px)] rounded-[24px] border border-black/[0.06] bg-white/95 p-3 shadow-xl backdrop-blur-md"
          >
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileNavClick(link.href)}
                  className="rounded-[14px] px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/[0.04]"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 border-t border-black/[0.06] pt-3">
                <Button
                  href="#contact"
                  variant="primary"
                  className="w-full !text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
