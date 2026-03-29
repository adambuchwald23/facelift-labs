/**
 * Centralized animation presets — responsive to mobile / desktop.
 *
 * On mobile, animations are driven by a custom IntersectionObserver hook
 * (`useInView`) that only initialises after hydration, avoiding the SSR
 * mismatch that caused `whileInView` to fire prematurely. Components use
 * `animate={inView ? "visible" : "hidden"}` instead of `whileInView`.
 *
 * Desktop still uses Framer Motion's `whileInView` since `useIsMobile`
 * returns `false` on both server and desktop client — no mismatch.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Container (stagger parent) ── */

export function staggerContainer(mobile: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mobile ? 0.05 : 0.09,
        delayChildren: mobile ? 0.02 : 0.04,
      },
    },
  };
}

/* ── Fade-up child (cards, rows, fields) ── */

export function fadeUp(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 6 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.5 : 0.7,
        ease: EASE,
      },
    },
  };
}

/* ── Fade-up with scale (portfolio laptops) ── */

export function fadeUpScale(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 6 : 12, scale: mobile ? 0.98 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: mobile ? 0.5 : 0.7,
        ease: EASE,
      },
    },
  };
}

/* ── Slide-in from left (comparison rows) ── */

export function fadeInLeft(mobile: boolean) {
  return {
    hidden: { opacity: 0, x: mobile ? -4 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: mobile ? 0.45 : 0.65,
        ease: EASE,
      },
    },
  };
}

/* ── Desktop-only viewport config (used with whileInView) ── */

export const DESKTOP_VIEWPORT = {
  once: true,
  amount: 0.15 as number,
};

/* ── Standalone entrance (variants format) ── */

export function inlineEntrance(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 6 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.5 : 0.7,
        ease: EASE,
      },
    },
  };
}
