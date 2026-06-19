'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

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

    const isInteractive = (el: Element | null): boolean =>
      !!el?.closest('a, button, [data-interactive]');

    const getCursorLabel = (el: Element | null): string =>
      (el?.closest('[data-cursor-label]') as HTMLElement | null)
        ?.dataset.cursorLabel ?? '';

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isInteractive(target)) ring.classList.add('hovered');

      const lbl = getCursorLabel(target);
      if (lbl) {
        label.textContent = lbl;
        ring.classList.add('labeled');
      }
    };

    const onOut = (e: MouseEvent) => {
      const target   = e.target as Element;
      const related  = e.relatedTarget as Element | null;
      /* Only remove classes when leaving the interactive area entirely —
         not when moving between parent and a child element inside it. */
      if (isInteractive(target) && !isInteractive(related))
        ring.classList.remove('hovered');
      if (getCursorLabel(target) && !getCursorLabel(related)) {
        label.textContent = '';
        ring.classList.remove('labeled');
      }
    };

    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });

    let scale = 1;
    const onDown = () => { scale = 0.72; };
    const onUp   = () => { scale = 1; };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-ring-label" ref={labelRef} />
      </div>
    </>
  );
}
