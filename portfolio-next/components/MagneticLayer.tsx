'use client';

import { useEffect } from 'react';

export default function MagneticLayer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const STRENGTH = 0.4;
    const attached  = new WeakSet<Element>();

    function attach(el: Element) {
      if (attached.has(el)) return;
      attached.add(el);

      let rafId          = 0;
      let transitionTimer = 0;

      const onMove = (evt: Event) => {
        const e = evt as MouseEvent;
        const r  = el.getBoundingClientRect();
        const tx = (e.clientX - (r.left + r.width  / 2)) * STRENGTH;
        const ty = (e.clientY - (r.top  + r.height / 2)) * STRENGTH;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          (el as HTMLElement).style.transform = `translate(${tx}px,${ty}px)`;
        });
      };

      const onLeave = () => {
        cancelAnimationFrame(rafId);
        clearTimeout(transitionTimer);
        const h = el as HTMLElement;
        h.style.transition = 'transform 0.55s cubic-bezier(0.175,0.885,0.32,1.275)';
        h.style.transform  = '';
        transitionTimer = window.setTimeout(() => { h.style.transition = ''; }, 580);
      };

      el.addEventListener('mousemove',  onMove,  { passive: true });
      el.addEventListener('mouseleave', onLeave);
    }

    const scan = () =>
      document.querySelectorAll('.magnetic').forEach(attach);

    scan();

    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
