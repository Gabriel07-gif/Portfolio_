'use client';

import { useEffect, useState } from 'react';
import { getLenisInstance } from '@/lib/lenis-instance';

export default function BackTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-top${visible ? ' visible' : ''}`}
      id="backTop"
      aria-label="Voltar ao topo da página"
      type="button"
      onClick={handleClick}
    >
      ↑
    </button>
  );
}
