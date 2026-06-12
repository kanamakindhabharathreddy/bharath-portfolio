import { useEffect, useRef, useState } from 'react'

const ASCII_FRAMES = [
  `  ██████╗ ██████╗ 
 ██╔══██╗██╔══██╗
 ██████╔╝██████╔╝
 ██╔══██╗██╔══██╗
 ██████╔╝██║  ██║
 ╚═════╝ ╚═╝  ╚═╝`,
  `  ▒▒████▒ ▒█████▒
 ▒█▒  ▒█▒▒█▒  ▒█
 ▒█████▒ ▒█████▒
 ▒█▒  ▒▒ ▒█▒  ▒▒
 ▒█▒  ▒█▒▒█▒  ▒█
 ▒▒    ▒▒▒▒    ▒▒`,
  `  ░░░░░░  ░░░░░░
 ░█░  ░█░░█░  ░█
 ░█░░░░░ ░█░░░░░
 ░█░░░░░ ░█░░░░░
 ░█░  ░█░░█░  ░█
 ░░    ░░░░    ░░`,
  ` ▄▄▄▄▄▄  ▄▄▄▄▄▄
 █      ██      █
 █ ████ ██ ████ █
 █ ████ ██ ████ █
 █      ██      █
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`,
]

const STATS = [
  { label: 'CGPA',          value: 8.8,  suffix: '/10',    decimals: 1 },
  { label: 'Years Coding',  value: 3,    suffix: '+',      decimals: 0 },
  { label: 'Projects Built',value: 10,   suffix: '+',      decimals: 0 },
  { label: 'Certs Earned',  value: 2,    suffix: '',       decimals: 0 },
]

export default function About() {
  const [frameIndex, setFrameIndex] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const statRefs = useRef([])
  const sectionRef = useRef(null)
  const [countersStarted, setCountersStarted] = useState(false)
  const [counts, setCounts] = useState(STATS.map(() => 0))

  // ASCII glitch cycle
  useEffect(() => {
    const cycle = () => {
      setGlitching(true)
      let f = 0
      const glitch = setInterval(() => {
        setFrameIndex(Math.floor(Math.random() * ASCII_FRAMES.length))
        f++
        if (f > 8) {
          clearInterval(glitch)
          setFrameIndex(0)
          setGlitching(false)
        }
      }, 80)
    }
    const interval = setInterval(cycle, 4000)
    return () => clearInterval(interval)
  }, [])

  // Intersection observer for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [countersStarted])

  useEffect(() => {
    if (!countersStarted) return
    STATS.forEach((stat, i) => {
      const start = performance.now()
      const duration = 2500
      const animate = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCounts((prev) => {
          const next = [...prev]
          next[i] = eased * stat.value
          return next
        })
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    })
  }, [countersStarted])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-base relative"
      aria-label="About Bharath"
    >
      {/* Grid lines bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16 reveal-up opacity-0">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-cyan/60 mb-3">ABOUT ME</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl gradient-text-cyan-indigo">
            The Architect
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — ASCII portrait */}
          <div className="reveal-left opacity-0 flex flex-col items-center gap-6">
            <div
              className="relative glass-panel p-8 font-mono text-[10px] md:text-xs leading-tight border-glow-cyan"
              style={{
                filter: glitching
                  ? `drop-shadow(0 0 8px #00FFFF) hue-rotate(${Math.random() * 30}deg)`
                  : 'none',
                transition: 'filter 0.1s',
              }}
            >
              {/* Glitch scanlines */}
              {glitching && (
                <div
                  className="absolute inset-0 pointer-events-none z-10 opacity-30"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 4px)',
                  }}
                />
              )}
              <pre className="text-cyan whitespace-pre">{ASCII_FRAMES[frameIndex]}</pre>
              <div className="mt-4 text-white/30 text-[9px] tracking-widest text-center">
                // KANAMAKINDHA BHARATH REDDY
              </div>
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-3 glass-panel px-6 py-3 border-glow-indigo">
              <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
              <span className="font-orbitron text-[10px] tracking-[0.3em] text-white/60">
                TIRUPATI, ANDHRA PRADESH
              </span>
            </div>
          </div>

          {/* Right — Bio + Stats */}
          <div className="reveal-right opacity-0 flex flex-col gap-8">
            <div className="stagger-children">
              <p className="font-space text-white/70 text-base leading-8">
                I'm a{' '}
                <span className="text-cyan font-semibold">Computer Science Engineer</span> at
                Sri Venkateswara College of Engineering, passionate about building intelligent
                systems that bridge the gap between{' '}
                <span className="text-indigo-light font-semibold">AI/ML research</span> and
                real-world applications.
              </p>
              <p className="font-space text-white/50 text-sm leading-7 mt-4">
                From training neural networks on{' '}
                <span className="text-orange">TensorFlow</span> to architecting enterprise
                workflows on <span className="text-orange">ServiceNow</span>, I thrive at the
                intersection of machine learning, full-stack development, and problem solving.
                Currently pursuing B.Tech (2022–2026).
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 stagger-children">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => (statRefs.current[i] = el)}
                  className="glass-panel p-5 border-glow-cyan flex flex-col gap-1 hover:scale-105 transition-transform duration-300"
                >
                  <div className="font-orbitron font-black text-3xl gradient-text">
                    {stat.decimals > 0 ? counts[i].toFixed(1) : Math.round(counts[i])}
                    <span className="text-cyan text-xl">{stat.suffix}</span>
                  </div>
                  <div className="font-space text-white/40 text-xs tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-3 stagger-children">
              <a
                href="mailto:kanamakindhabharathreddy@gmail.com"
                className="flex items-center gap-2 glass-panel px-4 py-2 text-white/50 hover:text-cyan text-xs font-space tracking-wide transition-colors border border-white/10 hover:border-cyan/30 rounded-lg"
                aria-label="Email Bharath"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                kanamakindhabharathreddy@gmail.com
              </a>
              <a
                href="tel:+918688587050"
                className="flex items-center gap-2 glass-panel px-4 py-2 text-white/50 hover:text-cyan text-xs font-space tracking-wide transition-colors border border-white/10 hover:border-cyan/30 rounded-lg"
                aria-label="Call Bharath"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8688587050
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
