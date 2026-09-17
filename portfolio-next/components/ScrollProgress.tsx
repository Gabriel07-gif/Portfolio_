'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;
    let scrollMax = document.documentElement.scrollHeight - window.innerHeight;

    const updateMax = () => {
      scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      onScroll();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const progress = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
        bar.style.transform = `scaleX(${progress})`;
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateMax, { passive: true });
    const observer = new ResizeObserver(updateMax);
    observer.observe(document.body);
    updateMax();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateMax);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      ref={barRef}
      id="scrollProgress"
      style={{ width: '100%', transform: 'scaleX(0)', transformOrigin: 'left' }}
      role="progressbar"
      aria-hidden="true"
    />
  );
}
