'use client'

import { useRef, useEffect, useState } from 'react'

/* ─── Reveal hook via IntersectionObserver ─── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'none'
            }, delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}

/* ─── Project glow hover helper ─── */
const projHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'rgba(235,203,133,0.28)'
    const glow = e.currentTarget.querySelector<HTMLDivElement>('.proj-glow')
    if (glow) glow.style.opacity = '1'
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'rgba(134,129,114,0.1)'
    const glow = e.currentTarget.querySelector<HTMLDivElement>('.proj-glow')
    if (glow) glow.style.opacity = '0'
  },
}

const subHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'rgba(235,203,133,0.2)'
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'rgba(134,129,114,0.08)'
  },
}

export default function Work() {
    const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)

    check()

    window.addEventListener('resize', check)

    return () => window.removeEventListener('resize', check)
  }, [])

  const mainRef = useReveal(0)
  const sub1Ref = useReveal(120)
  const sub2Ref = useReveal(200)
   
  

  return (
    <section id="work" style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>

        {/* Section label */}
        <p style={{
          fontFamily: '"SF Mono", Menlo, monospace',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#EBCB85',
          marginBottom: 44,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          selected work
          <span style={{ display: 'block', width: 40, height: 1, background: 'rgba(235,203,133,0.4)' }} />
        </p>

        {/* Section headline */}
        <h2 style={{
          fontFamily: 'Georgia, "Palatino Linotype", serif',
          fontSize: 'clamp(26px, 3.8vw, 46px)',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: 64,
          color: '#F8F8F0',
        }}>
          Things I&apos;ve shipped that mattered
        </h2>

        {/* Work grid — 1.5fr / 1fr */}
        <div style={{
          display: 'grid',
         gridTemplateColumns:
  mobile
    ? '1fr'
    : '1.5fr 1fr',
          gap: 20,
        }}>

          {/* Main project card */}
          <div
            ref={mainRef}
            style={{
              border: '1px solid rgba(134,129,114,0.1)',
              padding: mobile ? 20 : 32,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease, border-color 0.3s',
              cursor: 'none',
            }}
            {...projHover}
          >
            <div className="proj-glow" style={{
              position: 'absolute', inset: 0, opacity: 0,
              background: 'radial-gradient(ellipse at 20% 40%, rgba(235,203,133,0.05), transparent 70%)',
              transition: 'opacity 0.4s',
              pointerEvents: 'none',
            }} />

            <div style={{
              fontFamily: '"SF Mono", Menlo, monospace',
              fontSize: 11,
              color: '#EBCB85',
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              marginBottom: 16,
            }}>
              2021 — 2024 · GIS SaaS platform
            </div>

            <h3 style={{
              fontFamily: 'Georgia, "Palatino Linotype", serif',
              fontSize: 21, fontWeight: 400,
              marginBottom: 10, lineHeight: 1.3,
              color: '#F8F8F0',
            }}>
              Drone Imagery Platform — Aakashe Innovations
            </h3>

            <p style={{
              fontSize: 14, color: '#868172',
              lineHeight: 1.7, marginBottom: 22,
            }}>
              Founding frontend developer on a two-application platform: a multi-tenant admin
              suite for managing users, orgs and subscriptions, and a precision map editor for
              GIS professionals. Built polygon drawing tools with live coordinate output, QC and
              evaluation profiles, KML/KMZ file ingestion, and a full renderer migration for
              performance.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {['MapLibre', 'Turf.js', 'Terra Draw', 'React', 'OpenLayers', 'SaaS'].map(tag => (
                <span key={tag} style={{
                  fontFamily: '"SF Mono", Menlo, monospace',
                  fontSize: 11, color: '#868172',
                  border: '1px solid rgba(134,129,114,0.18)',
                  padding: '3px 9px', borderRadius: 2,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sub-stack — two smaller cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div
              ref={sub1Ref}
              style={{
                border: '1px solid rgba(134,129,114,0.08)',
                padding: 22, borderRadius: 2,
                position: 'relative', overflow: 'hidden',
                opacity: 0, transform: 'translateY(20px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease, border-color 0.3s',
                cursor: 'none',
              }}
              {...subHover}
            >
              <div className="proj-glow" style={{
                position: 'absolute', inset: 0, opacity: 0,
                background: 'radial-gradient(ellipse at 20% 40%, rgba(235,203,133,0.05), transparent 70%)',
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
              }} />
              <div style={{
                fontFamily: '"SF Mono", Menlo, monospace',
                fontSize: 11, color: '#EBCB85',
                textTransform: 'uppercase', letterSpacing: '0.09em',
                marginBottom: 16,
              }}>
                2025 — present · stealth
              </div>
              <h3 style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: 16, fontWeight: 400,
                marginBottom: 10, lineHeight: 1.3,
                color: '#F8F8F0',
              }}>
                Current build
              </h3>
              <p style={{ fontSize: 13, color: '#868172', lineHeight: 1.7 }}>
                Something I can&apos;t talk about yet. When it&apos;s ready, it&apos;ll speak for itself.
              </p>
            </div>

            <div
              ref={sub2Ref}
              style={{
                border: '1px solid rgba(134,129,114,0.08)',
                padding: 22, borderRadius: 2,
                position: 'relative', overflow: 'hidden',
                opacity: 0, transform: 'translateY(20px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease, border-color 0.3s',
                cursor: 'none',
              }}
              {...subHover}
            >
              <div className="proj-glow" style={{
                position: 'absolute', inset: 0, opacity: 0,
                background: 'radial-gradient(ellipse at 20% 40%, rgba(235,203,133,0.05), transparent 70%)',
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
              }} />
              <div style={{
                fontFamily: '"SF Mono", Menlo, monospace',
                fontSize: 11, color: '#EBCB85',
                textTransform: 'uppercase', letterSpacing: '0.09em',
                marginBottom: 16,
              }}>
                visual practice
              </div>
              <h3 style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: 16, fontWeight: 400,
                marginBottom: 10, lineHeight: 1.3,
                color: '#F8F8F0',
              }}>
                Photography
              </h3>
              <p style={{ fontSize: 13, color: '#868172', lineHeight: 1.7 }}>
                Fashion, weddings, portraits — professionally. Landscape now, as a habit.
                The eye doesn&apos;t retire when you put the camera down.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}