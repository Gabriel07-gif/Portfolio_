'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from '@/lib/lenis-instance';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenisInstance(lenis);

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href')!.slice(1);
      const el = id ? document.getElementById(id) : document.documentElement;
      if (el === document.documentElement) {
        lenis.scrollTo(0);
      } else if (el) {
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener('click', handleClick);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleClick);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
