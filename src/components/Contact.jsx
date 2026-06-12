import { useState, useRef } from 'react'

const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/bharathreddy',
    color: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bharathreddy',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45C23.2 24 24 23.22 24 22.27V1.73C24 .78 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:kanamakindhabharathreddy@gmail.com',
    color: '#00FFFF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')
    // Simulate send (no backend — demo mode)
    await new Promise((r) => setTimeout(r, 2000))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section
      id="contact"
      className="section-base relative"
      aria-label="Contact section"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(79,0,255,0.15), transparent)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 reveal-up opacity-0">
          <p className="font-orbitron text-[10px] tracking-[0.5em] text-cyan/60 mb-3">CONTACT</p>
          <h2 className="section-title font-orbitron font-black text-4xl md:text-6xl text-white">
            Open <span className="gradient-text">Channel</span>
          </h2>
          <p className="font-space text-white/40 text-sm mt-3">
            Available for internships, collaborations, and exciting projects
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
          {/* Social orbs */}
          <div className="reveal-left opacity-0 flex flex-col gap-6">
            <h3 className="font-orbitron text-xs tracking-[0.4em] text-white/40">CONNECT</h3>

            <div className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  id={`contact-${link.id}`}
                  href={link.href}
                  target={link.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 glass-panel px-6 py-4 hover:scale-105 transition-all duration-300"
                  style={{
                    borderColor: `${link.color}22`,
                  }}
                  aria-label={`${link.label} profile`}
                >
                  {/* Orb */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${link.color}15`,
                      border: `1px solid ${link.color}33`,
                      color: link.color,
                      boxShadow: `0 0 0 0 ${link.color}`,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="font-orbitron text-sm font-bold text-white group-hover:text-cyan transition-colors">
                      {link.label}
                    </div>
                    <div className="font-space text-[11px] text-white/40 group-hover:text-white/60 transition-colors">
                      {link.id === 'github' && 'github.com/bharathreddy'}
                      {link.id === 'linkedin' && 'linkedin.com/in/bharathreddy'}
                      {link.id === 'email' && 'kanamakindhabharathreddy@gmail.com'}
                    </div>
                  </div>

                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-cyan ml-auto transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Phone */}
            <a
              href="tel:+918688587050"
              className="flex items-center gap-3 text-white/30 hover:text-cyan text-xs font-space tracking-wide transition-colors"
              aria-label="Phone number"
            >
              <span className="w-6 h-px bg-white/20" />
              +91 8688587050
              <span className="w-6 h-px bg-white/20" />
            </a>
          </div>

          {/* Contact form */}
          <div className="reveal-right opacity-0">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-panel p-8 flex flex-col gap-5"
              style={{ border: '1px solid rgba(0,255,255,0.1)' }}
              aria-label="Contact form"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-orbitron text-[10px] tracking-widest text-white/40 mb-2 block"
                >
                  NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="input-glow w-full px-4 py-3 rounded-lg font-space text-sm"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-orbitron text-[10px] tracking-widest text-white/40 mb-2 block"
                >
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-glow w-full px-4 py-3 rounded-lg font-space text-sm"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-orbitron text-[10px] tracking-widest text-white/40 mb-2 block"
                >
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="input-glow w-full px-4 py-3 rounded-lg font-space text-sm resize-none"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="relative btn-primary w-full text-center overflow-hidden"
                aria-label="Send message"
              >
                {status === 'idle' && 'TRANSMIT MESSAGE →'}
                {status === 'sending' && (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border border-cyan/40 border-t-cyan rounded-full animate-spin" />
                    TRANSMITTING...
                  </span>
                )}
                {status === 'sent' && (
                  <span className="text-cyan">✓ MESSAGE RECEIVED</span>
                )}
                {status === 'error' && 'ERROR — RETRY'}
              </button>

              {status === 'sent' && (
                <p className="font-space text-white/40 text-xs text-center">
                  Thanks! I'll respond within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-8 border-t border-white/5">
          <p className="font-orbitron text-[9px] tracking-[0.4em] text-white/20">
            NEURAL COSMOS © 2025 · KANAMAKINDHA BHARATH REDDY · BUILT WITH REACT + THREE.JS
          </p>
        </div>
      </div>
    </section>
  )
}
