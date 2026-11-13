import { MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { SmoothScrollProvider } from './lib/smooth-scroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleLoaded = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <Loader onDone={handleLoaded} />
        <Cursor />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero ready={ready} />
          <Intro />
          <Services />
          <Projects />
          <Process />
          <About />
          <Contact />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
