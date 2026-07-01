'use client';

import { useState, useEffect } from 'react';

/**
 * Animates a number from 0 to `target` using an ease-out cubic curve.
 * @param target   Final value
 * @param duration Animation duration in ms
 * @param options  delayMs: start delay (default 0); trigger: if false, waits before counting (default true)
 */
export function useCounter(
  target: number,
  duration: number,
  options: { delayMs?: number; trigger?: boolean } = {},
): number {
  const { delayMs = 0, trigger = true } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let rafId = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [target, duration, delayMs, trigger]);

  return value;
}
