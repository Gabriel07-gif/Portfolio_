'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const load = () => setShouldLoad(true)
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 1800 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timer = globalThis.setTimeout(load, 900)
    return () => globalThis.clearTimeout(timer)
  }, [])

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      {shouldLoad ? <Spline scene={scene} className={className} /> : null}
    </Suspense>
  )
}
