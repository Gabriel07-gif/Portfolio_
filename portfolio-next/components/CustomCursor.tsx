'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
        visible = true;
      }
    };
    const onLeave = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);

    /* Hover effect on interactive elements */
    const SELECTORS = 'a, button, .lang-option, .side-dot, .skill-card, .redes li, .project-card';
    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    };
    document.querySelectorAll(SELECTORS).forEach(addHover);
    /* Observe future elements */
    const mo = new MutationObserver(() => {
      document.querySelectorAll(SELECTORS).forEach(addHover);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* Click pulse */
    const onDown = () => { ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.75)'; };
    const onUp   = () => { ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, ''); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
