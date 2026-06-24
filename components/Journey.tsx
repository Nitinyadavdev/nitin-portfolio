'use client'

import { useRef, useEffect } from 'react'

/* ─── Timeline steps matching index.html exactly ─── */
const steps = [
  {
    year: '2016',
    title: 'Mass Communication Graduate',
    role: 'The foundation of how I see information',
    desc: 'Graduated with a trained lens for how people consume, interpret, and respond to media. That instinct shapes every interface decision I make today.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4 2 9l10 5 10-5-10-5z"/>
        <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/>
        <path d="M22 9v6"/>
      </svg>
    ),
    tags: ['visual communication', 'media theory', 'storytelling'],
    delay: 0,
  },
  {
    year: '2016 — 2017',
    title: 'Graphic Designer',
    role: 'Learned the reason behind every visual choice',
    desc: "Self-taught, by choice — the full Adobe suite, DaVinci Resolve, video editing, motion work. Nobody assigned this. Pure curiosity turning into craft. This is where I stopped guessing and started reasoning visually.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l3.5-1 11-11-2.5-2.5-11 11L3 21z"/>
        <path d="M14 6l2.5 2.5"/>
        <path d="M17 3l4 4-2 2-4-4 2-2z"/>
      </svg>
    ),
    tags: ['Photoshop', 'Illustrator', 'After Effects', 'DaVinci Resolve', 'Lightroom'],
    delay: 80,
  },
  {
    year: '2017 — 2020',
    title: 'Professional Photographer',
    role: 'Trained the eye under real pressure, for real clients',
    desc: "Fashion editorials, weddings, couple portraits. Instagram presence, repeat clients, live deliverables. You don't learn composition and light in theory — you learn it when someone's paying you and there's no second take on the first dance.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h3.2l1.6-2.2h6.4L16.8 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
        <circle cx="12" cy="13.2" r="3.4"/>
      </svg>
    ),
    exif: '1/500s · f/2.8 · ISO 640 · 85mm · 22°42′N 75°52′E',
    tags: ['fashion photography', 'wedding & portraits', 'post-production', 'client direction'],
    delay: 160,
  },
  {
    year: '2020 — 2021',
    title: 'Self-taught Developer',
    role: 'COVID as a catalyst — 1.5 years of deliberate learning',
    desc: 'Used the lockdown to pivot intentionally. 18 months of structured self-teaching — HTML, CSS, then JavaScript. Ended with an internship offer from Incentive, a Bangalore-based startup. Not a shortcut. A commitment.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6 3 12l5 6"/>
        <path d="M16 6l5 6-5 6"/>
      </svg>
    ),
    tags: ['HTML / CSS', 'JavaScript', 'Internship @ Incentive, Bangalore'],
    delay: 240,
  },
  {
    year: '2021 — 2024',
    title: 'Founding Frontend Developer — Aakashe Innovations',
    role: 'Precision-critical GIS SaaS · drone imagery platform',
    desc: 'One of the founding engineers on a drone imagery platform. Built two applications simultaneously: a multi-tenant SaaS admin suite and a full-featured map editor where GIS professionals draw polygons, run QC, and ingest KML/KMZ data at coordinate-level accuracy. Migrated the core map renderer from OpenLayers to MapLibre + Turf + Terra Draw for performance — shipped the full MVP without losing a millimetre of precision.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M15 9l-2 6-6 2 2-6 6-2z"/>
      </svg>
    ),
    tags: ['MapLibre', 'Turf.js', 'Terra Draw', 'OpenLayers', 'KML / KMZ', 'React', 'Multi-tenant SaaS'],
    delay: 320,
  },
  {
    year: '2024 — now',
    title: 'AI Engineering',
    role: 'Synthesising everything that came before',
    desc: "Certified in Claude 101 and Claude Code 101. Actively building with AI — and bringing the full stack of what came before: a trained visual eye, precision-software experience, and the ability to communicate in any room. Currently building something in stealth.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 3c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6z"/>
      </svg>
    ),
    tags: ['Claude API', 'AI product development', 'Prompt engineering', 'Stealth startup'],
    delay: 400,
  },
]

/* ─── Individual step with IntersectionObserver reveal ─── */
function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

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
              if (dotRef.current) {
                dotRef.current.style.background = '#EBCB85'
                dotRef.current.style.borderColor = '#EBCB85'
                dotRef.current.style.boxShadow = '0 0 10px rgba(235,203,133,0.5)'
              }
              if (iconRef.current) {
                iconRef.current.style.animation = 'iconwake 2.4s ease-in-out forwards'
              }
            }, step.delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [step.delay])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingBottom: index === steps.length - 1 ? 0 : 54,
        opacity: 0,
        transform: 'translateX(-18px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      {/* Timeline dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          left: -52, top: 7,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'rgba(134,129,114,0.25)',
          border: '1px solid rgba(134,129,114,0.35)',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        }}
      />

      {/* Year */}
      <div style={{
        fontFamily: '"SF Mono", Menlo, monospace',
        fontSize: 11,
        color: '#EBCB85',
        letterSpacing: '0.09em',
        marginBottom: 7,
      }}>
        {step.year}
      </div>

      {/* Icon + Title */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 6,
      }}>
        <span
          ref={iconRef}
          style={{
            display: 'inline-flex', flexShrink: 0,
            color: 'rgba(134,129,114,0.5)',
            transform: 'scale(0.7) rotate(-8deg)',
            opacity: 0.45,
          }}
        >
          {step.icon}
        </span>
        <span style={{
          fontFamily: 'Georgia, "Palatino Linotype", serif',
          fontSize: 21,
          fontWeight: 400,
          color: '#F8F8F0',
        }}>
          {step.title}
        </span>
      </div>

      {/* Role / sub-label */}
      <div style={{
        fontSize: 13,
        color: 'rgba(235,203,133,0.75)',
        fontStyle: 'italic',
        marginBottom: 11,
      }}>
        {step.role}
      </div>

      {/* Description */}
      <p style={{
        fontSize: 14,
        color: '#868172',
        lineHeight: 1.75,
        maxWidth: 540,
      }}>
        {step.desc}
      </p>

      {/* EXIF metadata — photography step only */}
      {step.exif && (
        <div style={{
          marginTop: 10,
          fontFamily: '"SF Mono", Menlo, monospace',
          fontSize: 11,
          color: 'rgba(235,203,133,0.55)',
          letterSpacing: '0.06em',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {step.exif}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
        {step.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: '"SF Mono", Menlo, monospace',
            fontSize: 11,
            color: '#868172',
            border: '1px solid rgba(134,129,114,0.18)',
            padding: '3px 9px',
            borderRadius: 2,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Journey section ─── */
export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  /* Scroll-driven progress bar */
  useEffect(() => {
    const updateBar = () => {
      if (!timelineRef.current || !barRef.current) return
      const r = timelineRef.current.getBoundingClientRect()
      const pct = Math.min(100, Math.max(0,
        (-r.top + window.innerHeight * 0.55) / timelineRef.current.offsetHeight * 100
      ))
      barRef.current.style.height = pct + '%'
    }
    window.addEventListener('scroll', updateBar, { passive: true })
    updateBar()
    return () => window.removeEventListener('scroll', updateBar)
  }, [])

  return (
    <section id="journey" style={{ position: 'relative', zIndex: 2 }}>
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
          origin story
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
          Not a developer who learned design.
          <br />
          <em style={{ color: '#EBCB85', fontStyle: 'normal' }}>
            A visual thinker who learned to build.
          </em>
        </h2>

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: 'relative',
            paddingLeft: 48,
          }}
        >
          {/* Static background line */}
          <div style={{
            position: 'absolute',
            left: 0, top: 8, bottom: 8,
            width: 1,
            background: 'rgba(134,129,114,0.12)',
          }} />

          {/* Animated progress bar */}
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              left: 0, top: 8,
              width: 1,
              height: '0%',
              background: 'linear-gradient(to bottom, #EBCB85, rgba(235,203,133,0.3))',
              transition: 'height 0.15s linear',
            }}
          />

          {steps.map((step, i) => (
            <Step key={step.year} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}