import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import BrainParticles from '../three/BrainParticles'
import { animateHeroLetters } from '../animations/gsap'

const ROLES = ['AI Engineer', 'Java Developer', 'Problem Solver', 'Full Stack Dev', 'ML Enthusiast']

export default function Hero({ onBrainExplode }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayRole, setDisplayRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [brainExploded, setBrainExploded] = useState(false)
  const lettersRef = useRef(null)

  // ─── GSAP hero letter drop animation ───
  useEffect(() => {
    const timer = setTimeout(() => {
      animateHeroLetters('.hero-letter')
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  // ─── Typewriter role cycling ───
  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (!isDeleting && displayRole === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayRole === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    } else {
      const delta = isDeleting ? 60 : 100
      timeout = setTimeout(() => {
        setDisplayRole(
          isDeleting
            ? current.slice(0, displayRole.length - 1)
            : current.slice(0, displayRole.length + 1)
        )
      }, delta)
    }

    return () => clearTimeout(timeout)
  }, [displayRole, isDeleting, roleIndex])

  // ─── Scroll-triggered brain explosion ───
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6 && !brainExploded) {
        setBrainExploded(true)
        if (onBrainExplode) onBrainExplode()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [brainExploded, onBrainExplode])

  const name = 'BHARATH'

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* 3D Brain Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <BrainParticles exploded={brainExploded} count={6000} />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Eyebrow */}
        <p className="font-orbitron text-[10px] md:text-xs tracking-[0.5em] text-indigo-light mb-6 reveal-up opacity-0">
          NEURAL COSMOS // CS ENGINEER
        </p>

        {/* Name letters */}
        <h1
          ref={lettersRef}
          className="relative flex items-center justify-center gap-1 md:gap-3 mb-4"
          aria-label="Bharath"
        >
          {name.split('').map((letter, i) => (
            <span
              key={i}
              className="hero-letter inline-block font-orbitron font-black text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-none select-none"
              style={{
                color: i === 0 || i === name.length - 1 ? '#00FFFF' : '#FFFFFF',
                textShadow:
                  i === 0 || i === name.length - 1
                    ? '0 0 30px #00FFFF, 0 0 80px rgba(0,255,255,0.4)'
                    : '0 0 20px rgba(255,255,255,0.2)',
                opacity: 0, // GSAP will animate this
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Full name */}
        <p className="font-space text-white/40 text-sm md:text-base tracking-[0.3em] mb-2 reveal-up opacity-0">
          KANAMAKINDHA BHARATH REDDY
        </p>

        {/* Role typewriter */}
        <div className="h-10 flex items-center justify-center mb-10 reveal-up opacity-0">
          <span className="font-space text-xl md:text-3xl font-light">
            <span className="text-white/50">// </span>
            <span className="gradient-text font-semibold">{displayRole}</span>
            <span className="typewriter-cursor text-cyan" />
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 reveal-up opacity-0">
          <a
            href="#projects"
            id="hero-view-work"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View My Work
          </a>
          <a
            href="mailto:kanamakindhabharathreddy@gmail.com"
            id="hero-hire"
            className="btn-secondary"
          >
            Hire Me
          </a>
        </div>

        {/* Location + info strip */}
        <div className="flex items-center gap-6 text-white/30 text-xs font-space tracking-widest reveal-up opacity-0">
          <span>📍 Tirupati, AP</span>
          <span className="w-px h-4 bg-white/20" />
          <span>🎓 SVCE 2022–2026</span>
          <span className="w-px h-4 bg-white/20" />
          <span>⭐ CGPA 8.8</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-orbitron text-[8px] tracking-[0.4em] text-white/30">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan/50 to-transparent" />
        <div className="animate-bounce text-cyan/60">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
