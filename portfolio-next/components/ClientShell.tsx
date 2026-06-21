'use client';

import dynamic from 'next/dynamic';

const IntroOverlay   = dynamic(() => import('@/components/IntroOverlay'),   { ssr: false });
const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false });
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false });
const MagneticLayer  = dynamic(() => import('@/components/MagneticLayer'),  { ssr: false });
const SmoothScroll   = dynamic(() => import('@/components/SmoothScroll'),   { ssr: false });

export default function ClientShell() {
  return (
    <>
      <IntroOverlay />
      <CustomCursor />
      <ParticleCanvas />
      <MagneticLayer />
      <SmoothScroll />
    </>
  );
}
