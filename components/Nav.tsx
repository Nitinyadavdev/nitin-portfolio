'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: mobile ? '16px 20px' : '18px 48px',
        background: 'rgba(35,21,17,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(134,129,114,0.1)',
      }}
    >
      <span
        style={{
          fontFamily: '"SF Mono", Menlo, monospace',
          fontSize: mobile ? 12 : 13,
          color: '#F8F8F0',
          letterSpacing: '0.09em',
          whiteSpace: 'nowrap',
        }}
      >
        Nitin Kumar Yadav
      </span>

      {!mobile && (
        <>
          <ul
            style={{
              display: 'flex',
              gap: 28,
              listStyle: 'none',
            }}
          >
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
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontFamily: '"SF Mono", Menlo, monospace',
              fontSize: 11,
              color: '#EBCB85',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#EBCB85',
              }}
            />
            building in stealth
          </div>
        </>
      )}
    </motion.nav>
  )
}