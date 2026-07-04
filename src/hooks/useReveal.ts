import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook: returns a ref and class names that fade/slide the
 * element in the first time it enters the viewport. Pairs with the
 * `reveal` / `reveal-visible` utilities in theme.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, className: visible ? "reveal reveal-visible" : "reveal" };
}
