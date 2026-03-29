/**
 * Centralized animation presets.
 *
 * Mobile: quick opacity-only fade — no vertical travel, minimal stagger.
 * Momentum scrolling on phones makes stagger/translate animations unreliable.
 *
 * Desktop: richer entrance with Y offset and visible stagger cascade.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Container (stagger parent) ── */

export function staggerContainer(mobile: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mobile ? 0.04 : 0.16,
        delayChildren: mobile ? 0 : 0.1,
      },
    },
  };
}

/* ── Fade-up child (cards, rows, fields) ── */

export function fadeUp(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobile ? 0.45 : 0.85,
        ease: EASE,
      },
    },
  };
}

/* ── Fade-up with scale (portfolio laptops) ── */

export function fadeUpScale(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 0 : 16, scale: mobile ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: mobile ? 0.45 : 0.85,
        ease: EASE,
      },
    },
  };
}

/* ── Slide-in from left (comparison rows) ── */

export function fadeInLeft(mobile: boolean) {
  return {
    hidden: { opacity: 0, x: mobile ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: mobile ? 0.4 : 0.8,
        ease: EASE,
      },
    },
  };
}

/* ── Viewport config for whileInView ── */

export function viewportConfig(mobile: boolean) {
  return {
    once: true,
    amount: mobile ? 0.15 : 0.3,
  };
}

/* ── Inline (non-variant) entrance for standalone elements ── */

export function inlineEntrance(mobile: boolean) {
  return {
    initial: { opacity: 0, y: mobile ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: mobile ? 0.45 : 0.85,
      ease: EASE,
    },
  };
}
