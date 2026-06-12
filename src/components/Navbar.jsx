import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards',     href: '#awards'     },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Active section detection
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((s) => {
        const top = s.offsetTop - 120
        if (window.scrollY >= top) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-4 left-1/2 z-[9990] -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="glass-panel px-6 py-3 flex items-center justify-between transition-all duration-500"
        style={{
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,255,0.1)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleNav('#hero')}
          className="font-orbitron font-black text-sm tracking-widest gradient-text-cyan-indigo select-none"
          aria-label="Bharath Reddy home"
        >
          BR<span className="text-orange">.</span>EXE
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className={`
                  font-space text-xs tracking-[0.15em] uppercase transition-all duration-300
                  ${active === href.slice(1)
                    ? 'text-cyan glow-cyan'
                    : 'text-white/50 hover:text-white'}
                `}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:kanamakindhabharathreddy@gmail.com"
          className="hidden md:inline-flex items-center gap-2 font-orbitron text-[10px] tracking-widest text-cyan border border-cyan/30 px-4 py-2 rounded hover:bg-cyan/10 hover:border-cyan/60 transition-all duration-300"
          aria-label="Hire Bharath Reddy"
        >
          <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
          HIRE ME
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-cyan transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-cyan transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-cyan transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass-panel mt-2 p-4 md:hidden">
          <ul className="flex flex-col gap-4" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className="font-orbitron text-xs tracking-widest text-white/70 hover:text-cyan transition-colors w-full text-left"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
