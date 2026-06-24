import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nitin Kumar Yadav — AI Engineer · Visual Thinker',
  description: 'AI Engineer, Visual Thinker, and Photographer based in Indore, India.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}