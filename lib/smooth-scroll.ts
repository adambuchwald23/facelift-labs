const SCROLL_OFFSET = 96;

let activeRaf = 0;

/**
 * Duration scales with scroll distance so short jumps are snappy
 * and long jumps (e.g. top → contact) feel relaxed, not nauseating.
 */
function calcDuration(distancePx: number): number {
  const abs = Math.abs(distancePx);
  const base = 600;
  const scaled = base + abs * 0.35;
  return Math.min(Math.max(scaled, 800), 2200);
}

/**
 * Custom smooth scroll with distance-adaptive duration and cubic ease-in-out.
 * Cancels any in-flight animation before starting a new one.
 */
export function smoothScrollTo(el: HTMLElement, duration?: number) {
  if (activeRaf) cancelAnimationFrame(activeRaf);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const target = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  if (prefersReduced) {
    window.scrollTo(0, target);
    return;
  }

  const start = window.scrollY;
  const distance = target - start;
  const dur = duration ?? calcDuration(distance);
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / dur, 1);
    // cubic ease-in-out — gentle acceleration and deceleration
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start + distance * ease);
    if (progress < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      activeRaf = 0;
    }
  }

  activeRaf = requestAnimationFrame(step);
}
