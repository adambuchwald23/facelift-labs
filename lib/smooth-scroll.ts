/**
 * Custom smooth scroll with controlled duration and quartic ease-out.
 * Replaces native scroll-behavior:smooth which is too fast on mobile.
 */
export function smoothScrollTo(el: HTMLElement, duration = 1200) {
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - 96;
  const distance = target - start;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    window.scrollTo(0, start + distance * ease);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
