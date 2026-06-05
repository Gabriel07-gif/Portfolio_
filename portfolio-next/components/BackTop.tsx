'use client';

import { useEffect, useState } from 'react';

export default function BackTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-top${visible ? ' visible' : ''}`}
      id="backTop"
      aria-label="Voltar ao topo da página"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
