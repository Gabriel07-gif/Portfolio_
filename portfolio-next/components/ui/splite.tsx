'use client'

import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Application } from '@splinetool/runtime'
import { useElementActive } from '@/hooks/useElementActive'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: ReactNode
}

interface SplineErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
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
      return this.props.fallback ?? null
    }

    return this.props.children
  }
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useElementActive(containerRef)
  const applicationRef = useRef<Application | null>(null)
  const activeRef = useRef(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  /* A remote WebGL scene is the largest interactive cost on the page. Keep it
     for desktop, but use the supplied visual fallback on touch, reduced-motion,
     and compact layouts where it would compete with scrolling for GPU time. */
  const [canUse3D, setCanUse3D] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setCanUse3D(
        finePointer.matches &&
        !reducedMotion.matches &&
        window.innerWidth >= 1024,
      )
    }

    update()
    finePointer.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    window.addEventListener('resize', update, { passive: true })
    return () => {
      finePointer.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    activeRef.current = isVisible && canUse3D
    if (!canUse3D) { applicationRef.current = null; return }
    const application = applicationRef.current
    if (application) {
      if (activeRef.current) application.play()
      else application.stop()
    }
  }, [isVisible, canUse3D])

  useEffect(() => {
    if (!isVisible || !canUse3D || shouldLoad) return

    const load = () => setShouldLoad(true)
    let idleId: number | undefined
    const schedule = () => {
      if (idleId !== undefined) return
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(load, { timeout: 1500 })
      else load()
    }
    let seen = false
    try { seen = sessionStorage.getItem('g-intro-done') === '1' } catch {}
    seen ||= document.documentElement.dataset.introComplete === 'true'
    // Avoid running two WebGL engines during the entrance animation.
    const timer = window.setTimeout(schedule, seen || window.location.hash ? 250 : 8200)
    window.addEventListener('portfolio:intro-complete', schedule, { once: true })
    return () => {
      window.clearTimeout(timer)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      window.removeEventListener('portfolio:intro-complete', schedule)
    }
  }, [isVisible, canUse3D, shouldLoad])

  return (
    <div ref={containerRef} className="w-full h-full">
      <SplineErrorBoundary fallback={fallback}>
        <Suspense
          fallback={
            fallback ?? null
          }
        >
          {canUse3D && shouldLoad ? <Spline scene={scene} className={className} renderOnDemand onLoad={app => {
            applicationRef.current = app
            if (!activeRef.current) app.stop()
          }}>{fallback}</Spline> : fallback ?? null}
        </Suspense>
      </SplineErrorBoundary>
    </div>
  )
}
