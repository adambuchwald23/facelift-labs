import { useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  /** CSS rootMargin string — default uses 30% bottom inset so animations
   *  trigger when an element reaches the upper ~70% of the viewport. */
  rootMargin?: string;
  /** 0–1 visibility threshold */
  threshold?: number;
  /** Fire only once (default true) */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook using a **callback ref**.
 *
 * Unlike Framer Motion's `whileInView`, this hook:
 * - Only creates the observer when a DOM node is attached (no SSR mismatch)
 * - Uses a percentage-based rootMargin that scales with viewport size
 * - Returns a simple boolean that drives `animate` instead of `whileInView`
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -30% 0px",
  threshold = 0.15,
  once = true,
}: UseInViewOptions = {}): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const callbackRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          }
        },
        { rootMargin, threshold },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [rootMargin, threshold, once],
  );

  return [callbackRef, inView];
}
