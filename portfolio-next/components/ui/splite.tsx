'use client'

import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

interface SplineErrorBoundaryProps {
  children: ReactNode
}

interface SplineErrorBoundaryState {
  hasError: boolean
}

class SplineErrorBoundary extends Component<SplineErrorBoundaryProps, SplineErrorBoundaryState> {
  state: SplineErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SplineErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black/20">
          <span className="text-xs text-white/40">Experiência 3D indisponível</span>
        </div>
      )
    }

    return this.props.children
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '400px 0px', threshold: 0 },
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const load = () => setShouldLoad(true)
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 1800 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timer = globalThis.setTimeout(load, 900)
    return () => globalThis.clearTimeout(timer)
  }, [isVisible])

  return (
    <div ref={containerRef} className="w-full h-full">
      <SplineErrorBoundary>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            </div>
          }
        >
          {shouldLoad && isVisible ? <Spline scene={scene} className={className} /> : null}
        </Suspense>
      </SplineErrorBoundary>
    </div>
  )
}
