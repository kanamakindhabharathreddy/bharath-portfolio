import { useState } from 'react'

const TIMELINE = [
  {
    id: 'svce',
    date: '2022 – 2026',
    title: 'B.Tech Computer Science Engineering',
    org: 'Sri Venkateswara College of Engineering',
    location: 'Tirupati, Andhra Pradesh',
    type: 'education',
    color: '#00FFFF',
    detail: 'Pursuing B.Tech in Computer Science Engineering with a CGPA of 8.8/10. Focused on AI/ML, full stack development, and competitive programming.',
    icon: '🎓',
  },
  {
    id: 'smartbridge',
    date: 'Sep – Oct 2025',
    title: 'Virtual Intern — Enterprise Automation',
    org: 'SmartBridge & AICTE',
    location: 'Remote',
    type: 'internship',
    color: '#7B3FFF',
    detail: 'Built enterprise workflow automation solutions using ServiceNow ITSM platform. Completed AICTE-certified virtual internship with SmartBridge.',
    icon: '💼',
  },
  {
    id: 'smartsort',
    date: 'May – Jul 2025',
    title: 'SmartSort — AI Freshness Detection',
    org: 'Personal Project',
    location: 'Tirupati',
    type: 'project',
    color: '#FF6B00',
    detail: 'Developed full-stack AI application using TensorFlow, Flask, and Gemini API to detect freshness of produce with 94%+ accuracy.',
    icon: '🧠',
  },
  {
    id: 'ebox',
    date: 'Mar 2025',
    title: '5th Nationally — E-Box Top Coders',
    org: 'SVCE Tirupati',
    location: 'National Hackathon',
    type: 'award',
    color: '#FFE44D',
    detail: 'Achieved 5th place nationally in the E-Box Top Coders 2023 hackathon, competing against hundreds of engineers across India.',
    icon: '🏆',
  },
]

const CERTIFICATIONS = [
  { name: 'IBM: Getting Started with AI',  org: 'IBM',      color: '#006699', icon: '🤖' },
  { name: 'Red Hat Linux RH104',           org: 'Red Hat',  color: '#EE0000', icon: '🐧' },
  { name: 'AICTE Virtual Internship',      org: 'AICTE',    color: '#FF6B00', icon: '🎖️' },
]

export default function Experience() {
  const [expanded, setExpanded] = useState('svce')

  return (
    <section
      id="experience"
      className="section-base relative"
      aria-label="Experience and certifications"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 reveal-up opacity-0">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-indigo-light/70 mb-3">EXPERIENCE</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl text-white">
            Mission <span className="gradient-text-cyan-indigo">Timeline</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px timeline-line"
              style={{ background: 'linear-gradient(180deg, rgba(0,255,255,0.5), rgba(79,0,255,0.5), transparent)' }}
            />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={item.id} className="timeline-node relative pl-16">
                  {/* Pulse dot */}
                  <button
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: `radial-gradient(circle, ${item.color}22, transparent)`,
                      border: `1px solid ${item.color}44`,
                      boxShadow: expanded === item.id ? `0 0 20px ${item.color}66` : 'none',
                    }}
                    aria-expanded={expanded === item.id}
                    aria-label={`Toggle ${item.title}`}
                  >
                    {item.icon}
                    {/* Pulse ring */}
                    {expanded === item.id && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: `${item.color}22` }}
                      />
                    )}
                  </button>

                  {/* Content preview */}
                  <div>
                    <div
                      className="font-orbitron text-[9px] tracking-widest mb-1"
                      style={{ color: item.color }}
                    >
                      {item.date}
                    </div>
                    <div className="font-orbitron font-bold text-sm text-white">{item.title}</div>
                    <div className="font-space text-white/40 text-xs">{item.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="reveal-right opacity-0">
            {TIMELINE.filter((t) => t.id === expanded).map((item) => (
              <div
                key={item.id}
                className="glass-panel p-8 transition-all duration-500"
                style={{ borderColor: item.color + '33' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: item.color + '18', border: `1px solid ${item.color}33` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="font-orbitron font-black text-xl"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </div>
                    <div className="font-space text-white/50 text-sm">{item.org} · {item.location}</div>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 font-orbitron text-[9px] tracking-widest px-3 py-1.5 rounded-full mb-6"
                  style={{ color: item.color, background: item.color + '15', border: `1px solid ${item.color}33` }}
                >
                  {item.type.toUpperCase()} · {item.date}
                </div>

                <p className="font-space text-white/70 text-base leading-8">{item.detail}</p>
              </div>
            ))}

            {/* Certifications */}
            <div className="mt-8">
              <h3 className="font-orbitron text-xs tracking-[0.4em] text-white/40 mb-4">
                CERTIFICATIONS
              </h3>
              <div className="space-y-3 stagger-children">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="cert-badge w-full justify-start gap-3 glass-panel px-5 py-3"
                    style={{
                      color: cert.color,
                      borderColor: cert.color + '33',
                      background: cert.color + '0D',
                    }}
                  >
                    <span className="text-lg">{cert.icon}</span>
                    <div>
                      <div className="font-orbitron text-[10px] tracking-wide">{cert.name}</div>
                      <div className="font-space text-[10px] opacity-60 mt-0.5">{cert.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
