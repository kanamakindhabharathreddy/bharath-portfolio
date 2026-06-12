import { useEffect, useRef } from 'react'

/* ─── SmartSort Scanner Canvas ─── */
function ScannerCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width = 280
    const H = canvas.height = 120

    const items = [
      { label: 'Apple',    freshness: 92, color: '#00FF88' },
      { label: 'Mango',    freshness: 67, color: '#FFE44D' },
      { label: 'Tomato',   freshness: 34, color: '#FF4444' },
      { label: 'Orange',   freshness: 85, color: '#FF8C00' },
    ]

    let scanY = 0
    let frame = 0

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.85)'
      ctx.fillRect(0, 0, W, H)

      // Items bars
      items.forEach((item, i) => {
        const y = 10 + i * 26
        const maxW = W - 90
        const barW = (item.freshness / 100) * maxW

        ctx.fillStyle = 'rgba(255,255,255,0.05)'
        ctx.fillRect(80, y, maxW, 16)

        // Animated bar (fills over time)
        const animProgress = Math.min(1, frame / 120)
        ctx.fillStyle = item.color
        ctx.shadowColor = item.color
        ctx.shadowBlur = 6
        ctx.fillRect(80, y, barW * animProgress, 16)
        ctx.shadowBlur = 0

        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.font = '9px "Space Grotesk", monospace'
        ctx.fillText(item.label, 4, y + 11)

        ctx.fillStyle = item.color
        ctx.font = 'bold 9px monospace'
        ctx.fillText(`${item.freshness}%`, 80 + maxW + 6, y + 11)
      })

      // Scanner line
      ctx.fillStyle = 'rgba(0,255,255,0.5)'
      ctx.fillRect(0, scanY, W, 2)
      ctx.fillStyle = 'rgba(0,255,255,0.1)'
      ctx.fillRect(0, scanY - 10, W, 12)

      // Top label
      ctx.fillStyle = 'rgba(0,255,255,0.4)'
      ctx.font = '8px "Orbitron", monospace'
      ctx.fillText('SMARTSORT AI SCAN', 4, 8)

      scanY += 2
      if (scanY > H) scanY = 0
      frame++
      animRef.current = requestAnimationFrame(draw)
    }
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ borderRadius: 8, border: '1px solid rgba(0,255,255,0.15)' }}
    />
  )
}

/* ─── Workflow SVG Animation ─── */
function WorkflowSVG() {
  return (
    <svg
      viewBox="0 0 280 120"
      className="w-full"
      style={{ filter: 'drop-shadow(0 0 6px rgba(79,0,255,0.5))' }}
    >
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#7B3FFF" />
        </marker>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4F00FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Nodes */}
      {[
        { x: 20,  y: 55, label: 'Request' },
        { x: 100, y: 55, label: 'Workflow' },
        { x: 180, y: 55, label: 'Approval' },
        { x: 250, y: 55, label: 'Deploy'   },
      ].map(({ x, y, label }, i) => (
        <g key={label}>
          <rect
            x={x - 28} y={y - 16} width={56} height={32} rx={6}
            fill="rgba(79,0,255,0.2)" stroke="url(#flowGrad)" strokeWidth="1"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.5;1;0.5"
              dur={`${1.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </rect>
          <text
            x={x} y={y + 5}
            textAnchor="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize="7"
            fontFamily="Space Grotesk, sans-serif"
          >
            {label}
          </text>
          {i < 3 && (
            <line
              x1={x + 28} y1={y}
              x2={x + 44} y2={y}
              stroke="url(#flowGrad)"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="20" to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </line>
          )}
        </g>
      ))}

      <text x="140" y="110" textAnchor="middle" fill="rgba(0,255,255,0.3)" fontSize="7" fontFamily="Orbitron">
        SERVICENOW ENTERPRISE WORKFLOW
      </text>
    </svg>
  )
}

/* ─── Project Card ─── */
function ProjectCard({ title, dates, tag, tagColor, description, tech, links, visual, isHolo = false }) {
  return (
    <div className={`flip-card w-full max-w-md mx-auto ${isHolo ? 'float-idle' : ''}`}>
      <div className="flip-card-inner relative" style={{ height: 420 }}>
        {/* Front */}
        <div
          className={`flip-card-front absolute inset-0 glass-panel p-8 flex flex-col ${isHolo ? 'holographic' : ''}`}
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {isHolo && (
            <div
              className="absolute inset-0 rounded-[16px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, transparent 50%, rgba(79,0,255,0.05) 100%)',
              }}
            />
          )}

          <div className="flex items-start justify-between mb-4">
            <span
              className="font-orbitron text-[9px] tracking-widest px-3 py-1 rounded-full border"
              style={{ color: tagColor, borderColor: tagColor + '44', background: tagColor + '11' }}
            >
              {tag}
            </span>
            <span className="font-space text-[10px] text-white/30">{dates}</span>
          </div>

          <h3 className="font-orbitron font-black text-2xl mb-3" style={{ color: tagColor }}>
            {title}
          </h3>

          <p className="font-space text-white/60 text-sm leading-relaxed mb-6 flex-1">
            {description}
          </p>

          <div className="mt-auto">{visual}</div>

          <p className="text-center font-orbitron text-[8px] tracking-[0.3em] text-white/20 mt-4">
            HOVER TO FLIP →
          </p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 glass-panel p-8 flex flex-col"
          style={{ border: `1px solid ${tagColor}33`, background: `rgba(0,0,0,0.92)` }}
        >
          <h3 className="font-orbitron font-bold text-lg mb-2" style={{ color: tagColor }}>
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((t) => (
              <span
                key={t}
                className="font-orbitron text-[9px] tracking-widest px-3 py-1.5 rounded border text-white/70"
                style={{ borderColor: tagColor + '33', background: tagColor + '0D' }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex-1">
            <h4 className="font-orbitron text-[10px] tracking-widest text-white/40 mb-3">
              KEY FEATURES
            </h4>
            <ul className="space-y-2">
              {links.features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-space text-sm text-white/60">
                  <span style={{ color: tagColor }} className="mt-0.5 text-xs">▸</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 btn-primary text-center block"
            style={{ color: tagColor, borderColor: tagColor + '66' }}
            aria-label={`View ${title} on GitHub`}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-base relative"
      aria-label="Projects section"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 reveal-up opacity-0">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-cyan/60 mb-3">PROJECTS</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl text-white">
            Mission <span className="gradient-text">Archives</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start stagger-children">
          {/* SmartSort */}
          <ProjectCard
            title="SmartSort"
            dates="May – Jul 2025"
            tag="AI / COMPUTER VISION"
            tagColor="#00FFFF"
            isHolo={true}
            description="AI-powered freshness detection system that analyzes fruits and vegetables in real time using convolutional neural networks and multimodal AI."
            visual={<ScannerCanvas />}
            tech={['TensorFlow', 'Flask', 'Gemini API', 'Python', 'OpenCV', 'React', 'REST API']}
            links={{
              github: 'https://github.com/bharathreddy',
              features: [
                '8-class freshness classification with 94%+ accuracy',
                'Real-time scanning with animated visual feedback',
                'Gemini API for natural language freshness reports',
                'Flask REST backend with React frontend',
              ],
            }}
          />

          {/* Virtual Intern */}
          <ProjectCard
            title="Virtual Intern"
            dates="Sep – Oct 2025"
            tag="ENTERPRISE AUTOMATION"
            tagColor="#7B3FFF"
            description="Enterprise workflow automation platform built during SmartBridge & AICTE Virtual Internship. Streamlines IT service management using ServiceNow."
            visual={<WorkflowSVG />}
            tech={['ServiceNow', 'JavaScript', 'ITSM', 'REST API', 'GlideRecord', 'Scripting']}
            links={{
              github: 'https://github.com/bharathreddy',
              features: [
                'Automated incident routing reducing response time by 60%',
                'Custom ServiceNow scripts for enterprise workflow automation',
                'AICTE & SmartBridge certified project',
                'Integration with external REST APIs for ticketing systems',
              ],
            }}
          />
        </div>
      </div>
    </section>
  )
}
