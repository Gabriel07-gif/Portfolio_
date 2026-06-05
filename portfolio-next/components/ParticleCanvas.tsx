'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const N        = isMobile ? 20 : 45;
    const MAX_DIST = isMobile ? 80 : 110;
    const INTERVAL = 1000 / 30;

    let W = 0, H = 0, lastTime = 0, rafId = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    let debTimer = 0;
    const onResize = () => { clearTimeout(debTimer); debTimer = window.setTimeout(resize, 200); };
    window.addEventListener('resize', onResize, { passive: true });

    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  Math.random() * 1.4 + 0.5,
    }));

    let mx = -9999, my = -9999;
    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const getCol = () => document.documentElement.getAttribute('data-theme') !== 'light'
      ? '0,255,136'
      : '5,150,105';

    let rafPaused = false;
    const pause  = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; rafPaused = true; } };
    const resume = () => { if (rafPaused) { rafId = requestAnimationFrame(frame); rafPaused = false; } };
    const onVisibility = () => { document.hidden ? pause() : resume(); };
    document.addEventListener('visibilitychange', onVisibility);

    const frame = (ts: number) => {
      rafId = requestAnimationFrame(frame);
      const delta = ts - lastTime;
      if (delta < INTERVAL) return;
      lastTime = ts - (delta % INTERVAL);

      ctx.clearRect(0, 0, W, H);
      const col  = getCol();
      const fill = `rgba(${col},.28)`;

      ctx.fillStyle = fill;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (!isMobile) {
          const dx = p.x - mx, dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 8000 && d2 > 0) {
            const inv = 1.5 / Math.sqrt(d2);
            p.x += dx * inv; p.y += dy * inv;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }

      const STEPS = 5;
      for (let s = 1; s <= STEPS; s++) {
        const amin = (s - 1) / STEPS, amax = s / STEPS;
        const alpha = ((amin + amax) / 2) * 0.10;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${col},${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.6;
        for (let i = 0; i < N - 1; i++) {
          for (let j = i + 1; j < N; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 > MAX_DIST * MAX_DIST) continue;
            const ratio = 1 - Math.sqrt(d2) / MAX_DIST;
            if (ratio >= amin && ratio < amax) {
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
            }
          }
        }
        ctx.stroke();
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',    onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
