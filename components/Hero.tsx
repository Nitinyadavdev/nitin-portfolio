'use client'

import { useState } from 'react'

export default function Hero() {
  const [flashing, setFlashing] = useState(false)
  const [shutterActive, setShutterActive] = useState(false)

  const handleCamera = (e: React.MouseEvent) => {
    e.preventDefault()
    // Shutter click animation
    setShutterActive(true)
    setTimeout(() => setShutterActive(false), 320)
    // Flash
    setFlashing(true)
    setTimeout(() => setFlashing(false), 500)
    // Scroll
    setTimeout(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 160)
  }

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 48px 80px',
        position: 'relative',
        zIndex: 2,
        border: 'none',
      }}
    >
      {/* Camera flash overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#fff',
        zIndex: 9997,
        pointerEvents: 'none',
        opacity: flashing ? 0.92 : 0,
        transition: flashing ? 'opacity 0.04s ease' : 'opacity 0.5s ease-out',
      }} />

      <div style={{ maxWidth: 980, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: '"SF Mono", Menlo, monospace',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#EBCB85',
          marginBottom: 26,
          opacity: 0,
          animation: 'fup 0.8s 0.3s forwards',
        }}>
          AI engineer · frontend developer · visual thinker
        </p>

        {/* Headline — 3 lines with upward clip reveal */}
        <h1 style={{
          fontFamily: 'Georgia, "Palatino Linotype", serif',
          fontSize: 'clamp(40px, 6vw, 84px)',
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          marginBottom: 30,
        }}>
          {/* Line 1 */}
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              transform: 'translateY(105%)',
              animation: 'sup 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards',
            }}>
              I build the system.
            </span>
          </span>
          {/* Line 2 */}
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              transform: 'translateY(105%)',
              animation: 'sup 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s forwards',
            }}>
              I design the interface.
            </span>
          </span>
          {/* Line 3 — gold */}
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              color: '#EBCB85',
              transform: 'translateY(105%)',
              animation: 'sup 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s forwards',
            }}>
              I trained the eye first.
            </span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontSize: 17,
          color: '#868172',
          maxWidth: 500,
          lineHeight: 1.75,
          marginBottom: 44,
          opacity: 0,
          animation: 'fup 0.8s 1.1s forwards',
        }}>
          Years of professional photography and design. Three years shipping
          data-critical GIS software. Applied AI engineering now. Every phase was
          preparation for the one that followed.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          opacity: 0,
          animation: 'fup 0.8s 1.3s forwards',
        }}>
          {/* Primary — camera button */}
          <a
            href="#journey"
            onClick={handleCamera}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 26px',
              background: '#EBCB85',
              color: '#231511',
              fontFamily: '"SF Mono", Menlo, monospace',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontWeight: 700,
              borderRadius: 2,
              cursor: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#cfb375')}
            onMouseLeave={e => (e.currentTarget.style.background = '#EBCB85')}
          >
            <svg
              viewBox="0 0 24 24" width="16" height="16" fill="none"
              stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                animation: shutterActive
                  ? 'shutterclick 0.32s cubic-bezier(0.34,1.56,0.64,1)'
                  : 'none',
              }}
            >
              <path d="M4 8h3.2l1.6-2.2h6.4L16.8 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              <circle cx="12" cy="13.2" r="3.4"/>
              <circle cx="17.6" cy="10.4" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            See the journey
          </a>

          {/* Secondary */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '12px 25px',
              border: '1px solid rgba(134,129,114,0.28)',
              color: '#F8F8F0',
              fontFamily: '"SF Mono", Menlo, monospace',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              borderRadius: 2,
              cursor: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#EBCB85'
              e.currentTarget.style.color = '#EBCB85'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(134,129,114,0.28)'
              e.currentTarget.style.color = '#F8F8F0'
            }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll hint — scanning line */}
      <div style={{
        position: 'absolute', bottom: 36, left: 48,
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: '"SF Mono", Menlo, monospace',
        fontSize: 11,
        color: '#868172',
        opacity: 0,
        animation: 'fup 0.8s 1.6s forwards',
      }}>
        <div style={{
          width: 40, height: 1,
          background: 'rgba(134,129,114,0.3)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute',
            left: '-100%', top: 0,
            width: '100%', height: '100%',
            background: '#EBCB85',
            display: 'block',
            animation: 'scan 2.2s infinite',
          }} />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}