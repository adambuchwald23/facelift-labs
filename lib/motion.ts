/**
 * Centralized animation presets — responsive to mobile / desktop.
 *
 * Mobile gets a shorter Y travel (8 px) and tighter timing so animations
 * are visible but don't fight momentum scrolling. The viewport threshold
 * is high enough (0.3) that content won't animate until the user has
 * genuinely scrolled to it, with extra negative margin as a guard.
 *
 * Desktop keeps the richer entrance with larger offsets and stagger.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Container (stagger parent) ── */

export function staggerContainer(mobile: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mobile ? 0.08 : 0.16,
        delayChildren: mobile ? 0.05 : 0.1,
      },
    },
  };
}

/* ── Fade-up child (cards, rows, fields) ── */

export function fadeUp(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 8 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.55 : 0.85,
        ease: EASE,
      },
    },
  };
}

/* ── Fade-up with scale (portfolio laptops) ── */

export function fadeUpScale(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 8 : 16, scale: mobile ? 0.98 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: mobile ? 0.55 : 0.85,
        ease: EASE,
      },
    },
  };
}

/* ── Slide-in from left (comparison rows) ── */

export function fadeInLeft(mobile: boolean) {
  return {
    hidden: { opacity: 0, x: mobile ? -4 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: mobile ? 0.5 : 0.8,
        ease: EASE,
      },
    },
  };
}

/* ── Viewport config for whileInView ── */

export function viewportConfig(mobile: boolean) {
  return {
    once: true,
    amount: mobile ? 0.3 : 0.3,
    margin: mobile ? "0px 0px -80px 0px" : "0px",
  };
}

/* ── Inline (non-variant) entrance for standalone elements ── */

export function inlineEntrance(mobile: boolean) {
  return {
    initial: { opacity: 0, y: mobile ? 8 : 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: mobile ? 0.55 : 0.85,
      ease: EASE,
    },
  };
}
