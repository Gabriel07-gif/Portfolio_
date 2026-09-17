'use client';

import { useEffect } from 'react';
import { setLenisInstance } from '@/lib/lenis-instance';

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch      = window.matchMedia('(pointer: coarse)').matches;
    // Touch and reduced-motion use native scrolling, including anchor links.
    if (reduceMotion || isTouch) return;
    let lenis: import('lenis').default | null = null;
    let disposed = false;
    let rafId = 0;

    const handleClick = (e: MouseEvent) => {
      if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const id = anchor.getAttribute('href')!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el || anchor.classList.contains('skip-to-content')) return;
      e.preventDefault();
      // Lenis already respects the root scroll-padding-top used by native links.
      lenis.scrollTo(el);
      if (window.location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    };
    document.addEventListener('click', handleClick);

    /* Keep native scrolling on touch devices. Importing Lenis itself is deferred
       too, so mobile does not download a library it will never instantiate. */
    if (!reduceMotion && !isTouch) {
      void import('lenis').then(({ default: Lenis }) => {
        if (disposed) return;
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        setLenisInstance(lenis);

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }).catch(() => { /* Native links and scrolling remain available. */ });
    }

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleClick);
      if (lenis) {
        setLenisInstance(null);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
