import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import PlanetSkills from '../three/PlanetSkills'

const SKILL_DETAILS = {
  Java:        { icon: '☕', level: 90, desc: 'OOP principles, Data Structures, Spring basics, competitive programming.' },
  SQL:         { icon: '🗄️', level: 85, desc: 'MySQL, PostgreSQL, complex joins, indexing, and database optimization.' },
  JavaScript:  { icon: '⚡', level: 80, desc: 'ES6+, async/await, DOM manipulation, React, and REST API integration.' },
  Python:      { icon: '🐍', level: 82, desc: 'Flask web framework, NumPy, Pandas, ML pipelines with scikit-learn.' },
  'ML / AI':   { icon: '🧠', level: 78, desc: 'TensorFlow, Gemini API, image classification, model training & evaluation.' },
  Git:         { icon: '🔀', level: 88, desc: 'Version control, branching strategies, GitHub CI/CD, collaborative dev.' },
  CSS:         { icon: '🎨', level: 83, desc: 'Tailwind CSS, animations, responsive design, glassmorphism, 3D transforms.' },
  ServiceNow:  { icon: '⚙️', level: 75, desc: 'ITSM workflows, enterprise automation, scripting in ServiceNow platform.' },
}

const SKILL_COLORS = {
  Java: '#FF6B00', SQL: '#00FFFF', JavaScript: '#FFE44D', Python: '#7B3FFF',
  'ML / AI': '#FF3366', Git: '#FF6B00', CSS: '#00CCFF', ServiceNow: '#AA44FF',
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section
      id="skills"
      className="section-base relative"
      aria-label="Skills section"
      style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,0,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,0,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10 reveal-up opacity-0">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-orange/70 mb-3">SKILL SYSTEM</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl">
            <span className="gradient-text">Neural</span>{' '}
            <span className="text-white">Orbits</span>
          </h2>
          <p className="font-space text-white/40 text-sm mt-3">
            Hover a planet to explore its system
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* 3D Canvas */}
          <div
            className="relative w-full lg:flex-1 rounded-2xl overflow-hidden"
            style={{
              height: '520px',
              background: 'radial-gradient(ellipse at center, rgba(79,0,255,0.08) 0%, rgba(0,0,0,0) 70%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Canvas
              camera={{ position: [0, 6, 16], fov: 58 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
              onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
            >
              <Suspense fallback={null}>
                <PlanetSkills
                  onHoverSkill={setHoveredSkill}
                  onLeaveSkill={() => setHoveredSkill(null)}
                />
              </Suspense>
            </Canvas>

            {/* Skill name labels as HTML overlay pills */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4 pointer-events-none">
              {Object.entries(SKILL_DETAILS).map(([name, data]) => (
                <span
                  key={name}
                  className="font-orbitron text-[8px] tracking-widest px-2 py-1 rounded-full"
                  style={{
                    color: SKILL_COLORS[name],
                    background: SKILL_COLORS[name] + '15',
                    border: `1px solid ${SKILL_COLORS[name]}30`,
                    opacity: hoveredSkill?.name === name ? 1 : 0.5,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {data.icon} {name}
                </span>
              ))}
            </div>

            {/* Center hint */}
            {!hoveredSkill && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-orbitron text-[9px] tracking-[0.4em] text-white/20 pointer-events-none">
                ◎ ORBITING SKILL MATRIX
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {/* Hovered skill detail card */}
            <div
              className="glass-panel p-6 transition-all duration-500"
              style={{
                minHeight: 200,
                borderColor: hoveredSkill ? (SKILL_COLORS[hoveredSkill.name] + '44') : 'rgba(0,255,255,0.1)',
                boxShadow: hoveredSkill
                  ? `0 0 30px ${SKILL_COLORS[hoveredSkill.name]}22`
                  : 'none',
                opacity: hoveredSkill ? 1 : 0.5,
                transform: hoveredSkill ? 'scale(1)' : 'scale(0.97)',
              }}
            >
              {hoveredSkill ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{SKILL_DETAILS[hoveredSkill.name]?.icon}</span>
                    <div>
                      <div
                        className="font-orbitron font-bold text-xl"
                        style={{ color: SKILL_COLORS[hoveredSkill.name] }}
                      >
                        {hoveredSkill.name}
                      </div>
                      <div className="font-orbitron text-[9px] tracking-widest text-white/30 mt-0.5">
                        SKILL PLANET
                      </div>
                    </div>
                  </div>

                  <p className="font-space text-white/60 text-sm leading-relaxed mb-5">
                    {SKILL_DETAILS[hoveredSkill.name]?.desc}
                  </p>

                  <div>
                    <div className="flex justify-between font-orbitron text-[9px] mb-2">
                      <span className="text-white/30">PROFICIENCY</span>
                      <span style={{ color: SKILL_COLORS[hoveredSkill.name] }}>
                        {SKILL_DETAILS[hoveredSkill.name]?.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${SKILL_DETAILS[hoveredSkill.name]?.level}%`,
                          background: `linear-gradient(90deg, ${SKILL_COLORS[hoveredSkill.name]}, #ffffff44)`,
                          boxShadow: `0 0 8px ${SKILL_COLORS[hoveredSkill.name]}`,
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-3 py-6">
                  <div
                    className="w-14 h-14 rounded-full border border-cyan/20 flex items-center justify-center"
                    style={{ animation: 'spin 6s linear infinite' }}
                  >
                    <div className="w-3 h-3 rounded-full bg-cyan/40" />
                  </div>
                  <p className="font-orbitron text-[9px] tracking-[0.3em] text-white/20 text-center">
                    HOVER A PLANET<br />TO INSPECT
                  </p>
                </div>
              )}
            </div>

            {/* Skill grid */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(SKILL_DETAILS).map(([name, data]) => (
                <div
                  key={name}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: hoveredSkill?.name === name
                      ? SKILL_COLORS[name] + '15'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${hoveredSkill?.name === name ? SKILL_COLORS[name] + '44' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <span className="text-sm">{data.icon}</span>
                  <span
                    className="font-space text-xs"
                    style={{ color: hoveredSkill?.name === name ? SKILL_COLORS[name] : 'rgba(255,255,255,0.5)' }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
