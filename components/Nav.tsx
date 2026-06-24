'use client'

import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px',
        background: 'rgba(35,21,17,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(134,129,114,0.1)',
      }}
    >
      {/* Wordmark */}
      <span style={{
        fontFamily: '"SF Mono", Menlo, monospace',
        fontSize: 13,
        color: '#F8F8F0',
        letterSpacing: '0.09em',
      }}>
        Nitin Kumar Yadav
      </span>

      {/* Nav links */}
      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {['journey', 'work', 'contact'].map(link => (
          <li key={link}>
            <a
              href={`#${link}`}
              style={{
                fontFamily: '"SF Mono", Menlo, monospace',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: '#868172',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EBCB85')}
              onMouseLeave={e => (e.currentTarget.style.color = '#868172')}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Status badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        fontFamily: '"SF Mono", Menlo, monospace',
        fontSize: 11,
        color: '#EBCB85',
        letterSpacing: '0.06em',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#EBCB85',
          display: 'inline-block',
          animation: 'blink 2s infinite',
        }} />
        building in stealth
      </div>
    </motion.nav>
  )
}