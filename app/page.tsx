import Cursor     from '@/components/Cursor'
import GridCanvas  from '@/components/GridCanvas'
import Nav         from '@/components/Nav'
import Hero        from '@/components/Hero'
import Journey     from '@/components/Journey'
import Work        from '@/components/Work'
import Philosophy  from '@/components/philosophy'
import Contact     from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Cursor />
      <GridCanvas />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <Work />
        <Philosophy />
        <Contact />
      </main>
    </>
  )
}