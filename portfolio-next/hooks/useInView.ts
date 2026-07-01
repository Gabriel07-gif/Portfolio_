'use client';

import { useState, useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

export function useInView<T extends Element = HTMLElement>(
  threshold = 0.2,
): [MutableRefObject<T | null>, boolean] {
  const ref    = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); /* only needs to fire once */
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
