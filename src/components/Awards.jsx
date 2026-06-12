import { useEffect, useRef, useState } from 'react'

/* ─── Canvas Confetti ─── */
function ConfettiCanvas({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const colors = ['#00FFFF', '#4F00FF', '#FF6B00', '#7B3FFF', '#FFE44D', '#FF3366']
    const count = 200

    particles.current = Array.from({ length: count }, () => ({
      x: W / 2,
      y: H * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 2,
      alpha: 1,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
      shape: Math.random() < 0.5 ? 'rect' : 'circle',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      let alive = false

      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.35 // gravity
        p.vx *= 0.99
        p.alpha -= 0.012
        p.rot += p.rotV

        if (p.alpha > 0) {
          alive = true
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 4

          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
          ctx.shadowBlur = 0
        }
      })

      ctx.globalAlpha = 1
      if (alive) animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

/* ─── Trophy SVG ─── */
function TrophySVG() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-32 h-32"
      style={{ filter: 'drop-shadow(0 0 20px #FFE44D)' }}
    >
      {/* Glow ring */}
      <circle cx="60" cy="60" r="55" fill="none" stroke="#FFE44D" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="r" values="50;58;50" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Trophy cup */}
      <path d="M40 30 H80 V65 Q80 85 60 90 Q40 85 40 65 Z" fill="url(#trophyGrad)" />
      <path d="M40 35 Q20 40 22 55 Q24 68 40 65" fill="none" stroke="#FFE44D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 35 Q100 40 98 55 Q96 68 80 65" fill="none" stroke="#FFE44D" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="50" y="90" width="20" height="6" rx="2" fill="#FFE44D" opacity="0.9" />
      <rect x="44" y="96" width="32" height="5" rx="2.5" fill="#FFE44D" />

      {/* Star */}
      <text x="60" y="65" textAnchor="middle" fontSize="24" fontFamily="serif">⭐</text>

      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE44D" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Awards() {
  const sectionRef = useRef(null)
  const [confettiActive, setConfettiActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true)
          setTimeout(() => setConfettiActive(true), 500)
        }
      },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [visible])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      aria-label="Awards and achievements"
    >
      {/* Confetti canvas */}
      <ConfettiCanvas active={confettiActive} />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Title */}
        <div className="reveal-up opacity-0 mb-16">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-yellow-400/70 mb-3">ACHIEVEMENT</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl text-white">
            Hall of <span style={{ color: '#FFE44D', textShadow: '0 0 20px #FFE44D' }}>Glory</span>
          </h2>
        </div>

        {/* Main award */}
        <div
          className="glass-panel p-12 md:p-16 mx-auto max-w-3xl reveal-up opacity-0"
          style={{
            border: '1px solid rgba(255,228,77,0.2)',
            boxShadow: visible ? '0 0 60px rgba(255,228,77,0.15), 0 0 120px rgba(255,228,77,0.05)' : 'none',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Trophy */}
            <div className="relative">
              <TrophySVG />
            </div>

            {/* Content */}
            <div className="text-left">
              {/* Rank hero stat */}
              <div className="font-orbitron font-black leading-none mb-2">
                <span
                  className="text-7xl md:text-9xl"
                  style={{
                    color: '#FFE44D',
                    textShadow: '0 0 30px #FFE44D, 0 0 80px rgba(255,228,77,0.4)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.5)',
                    display: 'inline-block',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                  }}
                >
                  5TH
                </span>
              </div>

              <div
                className="font-orbitron font-bold text-2xl md:text-3xl text-white/90 mb-1"
                style={{ letterSpacing: '0.05em' }}
              >
                NATIONALLY
              </div>

              <div className="font-orbitron text-[10px] tracking-[0.4em] text-yellow-400/60 mb-6">
                E-BOX TOP CODERS 2023
              </div>

              <p className="font-space text-white/60 text-base leading-7 max-w-sm">
                Achieved <strong className="text-yellow-400">5th place nationally</strong> in the
                prestigious E-Box Top Coders hackathon, competing against hundreds of engineers
                from across India. Held at{' '}
                <span className="text-cyan">SVCE Tirupati</span> in March 2025.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['National Hackathon', 'Top 5', 'Competitive Programming', 'Mar 2025'].map((tag) => (
                  <span
                    key={tag}
                    className="font-orbitron text-[9px] tracking-widest px-3 py-1.5 rounded-full"
                    style={{
                      color: '#FFE44D',
                      background: 'rgba(255,228,77,0.08)',
                      border: '1px solid rgba(255,228,77,0.2)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-10 stagger-children">
          {[
            { val: '8.8', label: 'CGPA', color: '#00FFFF' },
            { val: 'Top 5', label: 'NATIONAL RANK', color: '#FFE44D' },
            { val: '2+', label: 'CERTIFICATIONS', color: '#7B3FFF' },
          ].map(({ val, label, color }) => (
            <div
              key={label}
              className="glass-panel p-6 hover:scale-105 transition-transform duration-300"
              style={{ border: `1px solid ${color}22` }}
            >
              <div
                className="font-orbitron font-black text-3xl"
                style={{ color, textShadow: `0 0 15px ${color}` }}
              >
                {val}
              </div>
              <div className="font-orbitron text-[9px] tracking-widest text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
