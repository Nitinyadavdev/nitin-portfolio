'use client'

import { useRef, useEffect } from 'react'

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

const stats = [
  { n: '3+', label: 'years shipping production frontend software' },
  { n: '6+', label: 'years working professionally with visual tools' },
  { n: '2',  label: 'AI engineering certifications earned this year' },
  { n: '1',  label: 'obsession: making it feel considered, not generated' },
]

export default function Philosophy() {
  const textRef  = useReveal(0)
  const statsRef = useReveal(150)

  return (
    <section style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>

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
          what I actually am
          <span style={{ display: 'block', width: 40, height: 1, background: 'rgba(235,203,133,0.4)' }} />
        </p>

        {/* Two-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72,
          alignItems: 'center',
        }}>

          {/* Left — headline + body */}
          <div
            ref={textRef}
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <h2 style={{
              fontFamily: 'Georgia, "Palatino Linotype", serif',
              fontSize: 'clamp(26px, 3.8vw, 46px)',
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 20,
              color: '#F8F8F0',
            }}>
              The AI era rewards people who{' '}
              <em style={{ color: '#EBCB85', fontStyle: 'normal' }}>
                don&apos;t look like AI.
              </em>
            </h2>
            <p style={{
              fontSize: 15,
              color: '#868172',
              lineHeight: 1.85,
            }}>
              Most AI-generated products share the same problem: technically correct,
              visually forgettable. I have a specific combination to offer — precision
              engineering from years of data-critical GIS work, layered on top of a
              trained eye from years of professional design and photography. I notice
              when something looks templated. I&apos;m unlikely to ship it.
            </p>
          </div>

          {/* Right — stats grid */}
          <div
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 28,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            {stats.map(s => (
              <div key={s.n}>
                <div style={{
                  fontFamily: 'Georgia, "Palatino Linotype", serif',
                  fontSize: 40,
                  color: '#EBCB85',
                  marginBottom: 5,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontSize: 13,
                  color: '#868172',
                  lineHeight: 1.5,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}