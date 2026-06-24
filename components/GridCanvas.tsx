'use client'

import { useEffect, useRef } from 'react'

const GRID = 80  // matches index.html exactly

const shutters  = ['1/25','1/50','1/100','1/160','1/200','1/320','1/500','1/800','1/1000','1/1600','1/2000','1/4000']
const apertures = ['f/1.4','f/1.8','f/2.0','f/2.8','f/3.5','f/4.0','f/5.6','f/8.0']
const isos      = [100,160,200,320,400,640,800,1600,3200]
const particleCount = window.innerWidth < 768 ? 8 : 10

function rLat() { return (Math.random()*180-90).toFixed(5)+'°'+(Math.random()>.5?'N':'S') }
function rLng() { return (Math.random()*360-180).toFixed(5)+'°'+(Math.random()>.5?'E':'W') }
function rExif() {
  return shutters[Math.floor(Math.random()*shutters.length)]
    +' · '+apertures[Math.floor(Math.random()*apertures.length)]
    +' · ISO '+isos[Math.floor(Math.random()*isos.length)]
}
function rParticle() {
  const t = Math.random()
  if (t < 0.45) return rLat()+' '+rLng()
  if (t < 0.75) return rExif()
  return rLat()+', '+rLng()
}

interface Floater {
  x: number; y: number; label: string
  op: number; spd: number; dir: number
}

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H

    /* 12 floating text particles — same count as HTML */
     const floaters: Floater[] = Array.from({ length: particleCount }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  label: rParticle(),
  op: Math.random() * 0.45 + 0.15,
  spd: Math.random() * 0.06 + 0.02,
  dir: Math.random() * Math.PI * 2,
}))


    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let t = 0
    let rafId: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      /* Grid lines */
      ctx.strokeStyle = 'rgba(134,129,114,0.18)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x < W; x += GRID) { ctx.moveTo(x, 0);  ctx.lineTo(x, H) }
      for (let y = 0; y < H; y += GRID) { ctx.moveTo(0, y);  ctx.lineTo(W, y) }
      ctx.stroke()

      /* Grid dots */
      ctx.fillStyle = 'rgba(134,129,114,0.22)'
      for (let x = 0; x < W; x += GRID) {
        for (let y = 0; y < H; y += GRID) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill()
        }
      }

      /* Floating particles — time-based sine opacity (matches HTML) */
      ctx.font = '10px "SF Mono", Menlo, monospace'
      for (const f of floaters) {
        f.x += Math.cos(f.dir) * f.spd
        f.y += Math.sin(f.dir) * f.spd

        if (f.x < -120) f.x = W + 60
        if (f.x > W + 120) f.x = -60
        if (f.y < -20)  f.y = H + 10
        if (f.y > H + 20) f.y = -10

        const p = 0.5 + 0.5 * Math.sin(t * 0.018 + f.dir)

        ctx.fillStyle = `rgba(235,203,133,${f.op * p})`
        ctx.fillText(f.label, f.x, f.y)

        ctx.beginPath()
        ctx.arc(f.x - 7, f.y - 4, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235,203,133,${f.op * p * 0.7})`
        ctx.fill()
      }

      t++
      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}