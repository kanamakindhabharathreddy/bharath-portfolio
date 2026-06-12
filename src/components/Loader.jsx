import { useEffect, useRef, useState } from 'react'

/* ─── Cinematic Loader — 4 second neural assembly ─── */
export default function Loader({ onComplete }) {
  const canvasRef = useRef(null)
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('assembling') // assembling | typing | complete
  const fullText = 'Initializing Bharath.exe'
  const animFrameRef = useRef(null)

  // ─── Canvas: particle brain assembly ───
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Build neuron targets (brain outline points)
    const neuronCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 600
    const neurons = []

    for (let i = 0; i < neuronCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 120 + 15 * Math.sin(phi * 4) * Math.cos(theta * 3) + 8 * Math.random()

      const sinPhi = Math.sin(phi)
      const tx = w / 2 + r * sinPhi * Math.cos(theta)
      const ty = h / 2 - r * Math.cos(phi) * 0.85

      neurons.push({
        x: Math.random() * w,
        y: Math.random() * h,
        tx, ty,
        size: Math.random() * 1.5 + 0.5,
        alpha: 0,
        arrived: false,
        color: `hsl(${180 + Math.random() * 60}, 100%, ${60 + Math.random() * 30}%)`,
        delay: Math.random() * 1.5,
      })
    }

    let startTime = null
    const duration = 3000 // 3s assembly

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, w, h)

      let allArrived = true

      neurons.forEach((n) => {
        if (elapsed < n.delay * 1000) return

        const t = Math.min(1, (elapsed - n.delay * 1000) / 2000)
        const ease = 1 - Math.pow(1 - t, 4)

        n.x += (n.tx - n.x) * 0.06
        n.y += (n.ty - n.y) * 0.06
        n.alpha = Math.min(1, t * 2)

        const dist = Math.hypot(n.x - n.tx, n.y - n.ty)
        if (dist > 3) allArrived = false

        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4)
        gradient.addColorStop(0, n.color.replace(')', `, ${n.alpha})`).replace('hsl', 'hsla'))
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.globalAlpha = n.alpha
        ctx.fill()
        ctx.globalAlpha = 1

        // Draw synapse lines to nearby neurons
        if (n.alpha > 0.5 && Math.random() < 0.02) {
          const near = neurons.find(
            (m) => m !== n && Math.hypot(m.x - n.x, m.y - n.y) < 40 && m.alpha > 0.5
          )
          if (near) {
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(near.x, near.y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * n.alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      if (!allArrived) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setPhase('typing')
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // ─── Typewriter effect ───
  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) {
        clearInterval(interval)
        // Start progress bar
        setPhase('loading')
      }
    }, 60)
    return () => clearInterval(interval)
  }, [phase])

  // ─── Progress bar fill ───
  useEffect(() => {
    if (phase !== 'loading') return
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 8 + 4
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setPhase('complete')
          setTimeout(onComplete, 600)
        }, 400)
      }
      setProgress(Math.min(100, p))
    }, 60)
    return () => clearInterval(interval)
  }, [phase, onComplete])

  return (
    <div
      className="fixed inset-0 z-[9998] bg-black flex flex-col items-center justify-center"
      style={{
        opacity: phase === 'complete' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'complete' ? 'none' : 'all',
      }}
    >
      {/* Skip button */}
      <button
        id="skip-loader"
        onClick={onComplete}
        className="absolute top-6 right-6 font-orbitron text-xs text-white/40 hover:text-cyan tracking-widest border border-white/10 hover:border-cyan/40 px-4 py-2 rounded transition-all duration-300"
        aria-label="Skip intro"
      >
        SKIP
      </button>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* UI overlay */}
      <div className="relative z-10 flex flex-col items-center gap-8 mt-[280px]">
        {/* Typewriter text */}
        <div className="font-orbitron text-cyan text-sm md:text-base tracking-[0.3em] glow-cyan min-h-[1.5em]">
          {text}
          {(phase === 'typing' || phase === 'loading') && (
            <span className="animate-pulse">█</span>
          )}
        </div>

        {/* Progress bar */}
        {(phase === 'loading' || phase === 'complete') && (
          <div className="w-72 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full plasma-bar rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Percentage */}
        {(phase === 'loading' || phase === 'complete') && (
          <div className="font-orbitron text-xs text-white/30 tracking-[0.2em]">
            {Math.round(progress)}% NEURAL SYNC
          </div>
        )}
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 font-orbitron text-[10px] text-white/20 tracking-[0.4em]">
        NEURAL COSMOS v1.0 // BHARATH.EXE
      </div>
    </div>
  )
}
