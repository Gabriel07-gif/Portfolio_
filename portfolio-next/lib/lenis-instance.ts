import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenisInstance(l: Lenis | null): void {
  if (typeof window === 'undefined') return;
  instance = l;
}

export function getLenisInstance(): Lenis | null {
  if (typeof window === 'undefined') return null;
  return instance;
}
