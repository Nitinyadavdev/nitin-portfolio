'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef      = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const spotRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
     if (window.matchMedia('(pointer: coarse)').matches) {
    return
  }

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let rafId: number

    /* ── Dot + spotlight: instant follow ── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY

      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top  = my + 'px'
      }
      if (spotRef.current) {
        spotRef.current.style.left = mx + 'px'
        spotRef.current.style.top  = my + 'px'
      }
    }

    /* ── Ring: lagged follow ── */
    const followRing = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      rafId = requestAnimationFrame(followRing)
    }

    /* ── Hover expand ── */
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('a, button, [data-cursor]')) return
      if (dotRef.current) {
        dotRef.current.style.width  = '14px'
        dotRef.current.style.height = '14px'
      }
      if (ringRef.current) {
        ringRef.current.style.width  = '44px'
        ringRef.current.style.height = '44px'
      }
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('a, button, [data-cursor]')) return
      if (dotRef.current) {
        dotRef.current.style.width  = '8px'
        dotRef.current.style.height = '8px'
      }
      if (ringRef.current) {
        ringRef.current.style.width  = '32px'
        ringRef.current.style.height = '32px'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    rafId = requestAnimationFrame(followRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Spotlight radial glow */}
      <div
        ref={spotRef}
        style={{
          position: 'fixed',
          width: 700, height: 700,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(235,203,133,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#EBCB85',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(235,203,133,0.35)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  )
}