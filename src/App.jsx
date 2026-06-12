import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { initAllAnimations } from './animations/gsap'
import AuroraBackground from './three/AuroraBackground'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Awards from './components/Awards'
import Contact from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = () => {
    setLoaded(true)
    // Initialize all GSAP animations after loader
    setTimeout(() => {
      initAllAnimations()
    }, 300)
  }

  return (
    <>
      {/* Noise overlay for film grain */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />

      {/* Cinematic Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main site */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
          pointerEvents: loaded ? 'all' : 'none',
        }}
      >
        {/* Persistent Aurora background canvas */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden="true"
        >
          <Canvas
            camera={{ position: [0, 0, 15], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <AuroraBackground />
            </Suspense>
          </Canvas>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Awards />
          <Contact />
        </main>
      </div>
    </>
  )
}
