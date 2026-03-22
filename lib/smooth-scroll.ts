const SCROLL_OFFSET = 96;

let activeRaf = 0;

/**
 * Custom smooth scroll with controlled duration and quartic ease-out.
 * Replaces native scroll-behavior:smooth which is too fast on mobile.
 * Cancels any in-flight animation before starting a new one.
 */
export function smoothScrollTo(el: HTMLElement, duration = 1200) {
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
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    window.scrollTo(0, start + distance * ease);
    if (progress < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      activeRaf = 0;
    }
  }

  activeRaf = requestAnimationFrame(step);
}
