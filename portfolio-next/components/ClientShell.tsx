'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import IntroOverlay from '@/components/IntroOverlay';

const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false });
const MagneticLayer  = dynamic(() => import('@/components/MagneticLayer'),  { ssr: false });
const SmoothScroll   = dynamic(() => import('@/components/SmoothScroll'),   { ssr: false });

export default function ClientShell() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setHasFinePointer(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <IntroOverlay />
      </ErrorBoundary>
      {/* A CSS-only grid needs no client-side chunk. */}
      <div className="bg-grid" aria-hidden="true" />
      {hasFinePointer && (
        <>
          <ErrorBoundary>
            <CustomCursor />
          </ErrorBoundary>
          <ErrorBoundary>
            <MagneticLayer />
          </ErrorBoundary>
        </>
      )}
      <ErrorBoundary>
        <SmoothScroll />
      </ErrorBoundary>
    </>
  );
}
