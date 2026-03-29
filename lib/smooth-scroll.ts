const SCROLL_OFFSET = 96;

let activeRaf = 0;

const IS_TOUCH =
  typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

/**
 * Duration scales with scroll distance so short jumps are snappy
 * and long jumps (e.g. top → contact) feel relaxed, not nauseating.
 * Mobile caps lower because smaller viewports make distance feel faster.
 */
function calcDuration(distancePx: number): number {
  const abs = Math.abs(distancePx);
  const base = 500;
  const scaled = base + abs * 0.3;
  const max = IS_TOUCH ? 1200 : 1800;
  return Math.min(Math.max(scaled, 650), max);
}

/**
 * Quintic ease-in-out — gentler acceleration than cubic, butter-smooth
 * deceleration. Feels more organic for scroll transitions.
 */
function easeInOutQuint(t: number): number {
  return t < 0.5
    ? 16 * t * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

/**
 * Custom smooth scroll with distance-adaptive duration.
 * Cancels any in-flight animation before starting a new one.
 */
export function smoothScrollTo(
  el: HTMLElement,
  duration?: number,
  onComplete?: () => void,
) {
  if (activeRaf) cancelAnimationFrame(activeRaf);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const target = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  if (prefersReduced) {
    window.scrollTo(0, target);
    onComplete?.();
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
    window.scrollTo(0, start + distance * easeInOutQuint(progress));
    if (progress < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      activeRaf = 0;
      onComplete?.();
    }
  }

  activeRaf = requestAnimationFrame(step);
}
