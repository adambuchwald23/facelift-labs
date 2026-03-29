import { useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  /** CSS rootMargin string, e.g. "0px 0px -120px 0px" */
  rootMargin?: string;
  /** 0–1 visibility threshold */
  threshold?: number;
  /** Fire only once (default true) */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook using a **callback ref**.
 *
 * A callback ref is critical here because `useIsMobile()` returns `false`
 * during SSR. Components pass `ref={mobile ? callbackRef : undefined}`,
 * so the ref only receives a DOM node after hydration flips `mobile` to
 * `true`. A regular useRef + useEffect would miss this because the effect
 * fires before the ref is attached.
 *
 * Unlike Framer Motion's `whileInView`, this hook:
 * - Only creates the observer when a DOM node is attached (no SSR mismatch)
 * - Uses a fixed-pixel rootMargin (not a percentage of element height)
 * - Returns a simple boolean that drives `animate` instead of `whileInView`
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
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
