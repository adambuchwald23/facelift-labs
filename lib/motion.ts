/**
 * Centralized animation presets — responsive to mobile / desktop
 * and `prefers-reduced-motion`.
 *
 * All section animations are driven by a custom IntersectionObserver hook
 * (`useInView`) that only initialises after hydration, avoiding the SSR
 * mismatch that caused `whileInView` to fire prematurely. Components use
 * `animate={inView ? "visible" : "hidden"}` instead of `whileInView`.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

let _reducedMotion: boolean | null = null;

function prefersReducedMotion(): boolean {
  if (_reducedMotion !== null) return _reducedMotion;
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  _reducedMotion = mql.matches;
  mql.addEventListener("change", (e) => { _reducedMotion = e.matches; });
  return _reducedMotion;
}

const INSTANT = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const INSTANT_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

/* ── Container (stagger parent) ── */

export function staggerContainer(mobile: boolean) {
  if (prefersReducedMotion()) return INSTANT_CONTAINER;
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mobile ? 0.1 : 0.09,
        delayChildren: mobile ? 0.08 : 0.04,
      },
    },
  };
}

/* ── Fade-up child (cards, rows, fields) ── */

export function fadeUp(mobile: boolean) {
  if (prefersReducedMotion()) return INSTANT;
  return {
    hidden: { opacity: 0, y: mobile ? 14 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.75 : 0.7,
        ease: EASE,
      },
    },
  };
}

/* ── Fade-up with scale (portfolio laptops) ── */

export function fadeUpScale(mobile: boolean) {
  if (prefersReducedMotion()) return INSTANT;
  return {
    hidden: { opacity: 0, y: mobile ? 14 : 12, scale: mobile ? 0.97 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: mobile ? 0.75 : 0.7,
        ease: EASE,
      },
    },
  };
}

/* ── Slide-in from left (comparison rows) ── */

export function fadeInLeft(mobile: boolean) {
  if (prefersReducedMotion()) return INSTANT;
  return {
    hidden: { opacity: 0, x: mobile ? -8 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: mobile ? 0.65 : 0.65,
        ease: EASE,
      },
    },
  };
}

/* ── Standalone entrance (variants format) ── */

export function inlineEntrance(mobile: boolean) {
  if (prefersReducedMotion()) return INSTANT;
  return {
    hidden: { opacity: 0, y: mobile ? 14 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.75 : 0.7,
        ease: EASE,
      },
    },
  };
}
