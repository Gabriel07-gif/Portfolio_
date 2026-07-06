'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let ticking = false;
    let scrollMax = document.documentElement.scrollHeight - window.innerHeight;

    const updateMax = () => {
      scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        bar.style.width = scrollMax > 0 ? `${(window.scrollY / scrollMax) * 100}%` : '0%';
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateMax, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateMax);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      ref={barRef}
      id="scrollProgress"
      role="progressbar"
      aria-hidden="true"
    />
  );
}
