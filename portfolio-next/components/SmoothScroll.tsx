'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
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
    const lenis = (reduceMotion || isTouch) ? null : new Lenis({ lerp: 0.1, smoothWheel: true });
    if (lenis) setLenisInstance(lenis);

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
      window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
    };
    document.addEventListener('click', handleClick);

    let rafId = 0;
    if (lenis) {
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    return () => {
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
