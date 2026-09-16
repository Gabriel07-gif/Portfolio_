'use client';

import { useEffect } from 'react';
import { setLenisInstance } from '@/lib/lenis-instance';

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch      = window.matchMedia('(pointer: coarse)').matches;
    /* Lenis is skipped on touch (fights native momentum scrolling) and on
       reduced-motion (its rAF-interpolated scroll IS the motion being asked
       to reduce). Either way, Navbar/SideDots always call preventDefault()
       on anchor clicks and rely entirely on the listener below to actually
       move the page — so it must stay registered in every case, just with
       a plain native scroll standing in for Lenis when skipped. */
    let lenis: import('lenis').default | null = null;
    let disposed = false;
    let rafId = 0;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href')!.slice(1);
      const el = id ? document.getElementById(id) : null;

      if (lenis) {
        if (el) {
          const navbar = document.getElementById('navbar');
          lenis.scrollTo(el, { offset: -(navbar?.getBoundingClientRect().height ?? 80) });
        } else {
          lenis.scrollTo(0);
        }
        return;
      }

      const top = el
        ? el.getBoundingClientRect().top + window.scrollY - (document.getElementById('navbar')?.getBoundingClientRect().height ?? 80)
        : 0;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
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
      });
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
