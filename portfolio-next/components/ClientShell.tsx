'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

const IntroOverlay   = dynamic(() => import('@/components/IntroOverlay'),   { ssr: false });
const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false });
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false });
const MagneticLayer  = dynamic(() => import('@/components/MagneticLayer'),  { ssr: false });
const SmoothScroll   = dynamic(() => import('@/components/SmoothScroll'),   { ssr: false });

export default function ClientShell() {
  return (
    <>
      <ErrorBoundary>
        <IntroOverlay />
      </ErrorBoundary>
      <ErrorBoundary>
        <CustomCursor />
      </ErrorBoundary>
      <ErrorBoundary>
        <ParticleCanvas />
      </ErrorBoundary>
      <ErrorBoundary>
        <MagneticLayer />
      </ErrorBoundary>
      <ErrorBoundary>
        <SmoothScroll />
      </ErrorBoundary>
    </>
  );
}
