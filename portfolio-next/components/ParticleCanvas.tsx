'use client';

/* Replaced heavy O(n²) canvas particle network with a lightweight CSS dot-grid.
   The ambient blob animations live in page.tsx/.bg-blobs — this component
   only adds the static grid pattern that gives depth to the background. */
export default function ParticleCanvas() {
  return <div className="bg-grid" aria-hidden="true" />;
}
