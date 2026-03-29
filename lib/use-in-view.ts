import { useRef, useState, useEffect } from "react";

interface UseInViewOptions {
  /** CSS rootMargin string, e.g. "0px 0px -120px 0px" */
  rootMargin?: string;
  /** 0–1 visibility threshold */
  threshold?: number;
  /** Fire only once (default true) */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook.
 *
 * Unlike Framer Motion's `whileInView`, this hook:
 * - Only creates the observer after mount (no SSR mismatch)
 * - Uses a fixed-pixel rootMargin (not a percentage of element height)
 * - Returns a simple boolean that drives `animate` instead of `whileInView`
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -120px 0px",
  threshold = 0.1,
  once = true,
}: UseInViewOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
