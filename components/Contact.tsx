'use client'

import { useRef } from 'react'

/* Magnetic button effect matching HTML behaviour */
function useMagnet() {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    el.style.transform = `translate(${(e.clientX - cx) * 0.22}px, ${(e.clientY - cy) * 0.22}px)`
    el.style.transition = 'transform 0.1s'
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
  }

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

export default function Contact() {
  const { ref, onMouseMove, onMouseLeave } = useMagnet()

  return (
    <>
      {/* Contact section */}
      <footer id="contact" style={{
        borderTop: '1px solid rgba(134,129,114,0.08)',
        padding: '110px 48px 48px',
        position: 'relative', zIndex: 2,
      }}>
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
            let&apos;s talk
            <span style={{ display: 'block', width: 40, height: 1, background: 'rgba(235,203,133,0.4)' }} />
          </p>

          {/* CTA headline */}
          <h2 style={{
            fontFamily: 'Georgia, "Palatino Linotype", serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400,
            maxWidth: 680,
            lineHeight: 1.18,
            marginBottom: 36,
            color: '#F8F8F0',
          }}>
            Open to consulting, contract builds, and conversations with people
            making something that deserves to look as good as it works.
          </h2>

          {/* Magnetic CTA button */}
          <a
           ref={ref}
            href="mailto:nitinyadav.kumar966@gmail.com"
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
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
          >
            Send a message →
          </a>

          {/* Footer meta */}
          <div style={{
            marginTop: 72,
            paddingTop: 22,
            borderTop: '1px solid rgba(134,129,114,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: '"SF Mono", Menlo, monospace',
            fontSize: 11,
            color: 'rgba(134,129,114,0.45)',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <span>Nitin Kumar Yadav · Indore, India</span>
            <span>© 2026</span>
          </div>

        </div>
      </footer>
    </>
  )
}