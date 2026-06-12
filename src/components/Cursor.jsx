import { useEffect, useRef, useState } from 'react'

/* ─── Custom Cursor — glowing cyan orb with trailing particles ─── */
export default function Cursor() {
  const orbRef = useRef(null)
  const trailsRef = useRef([])
  const trailCount = 8
  const positions = useRef([])
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Prefill positions
    positions.current = Array.from({ length: trailCount }, () => ({ x: -100, y: -100 }))

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e

      // Move main orb
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x - 10}px, ${y - 10}px)`
      }

      // Shift trail history
      positions.current.unshift({ x, y })
      positions.current = positions.current.slice(0, trailCount)

      // Update trails
      trailsRef.current.forEach((el, i) => {
        if (!el) return
        const pos = positions.current[i] || { x: -100, y: -100 }
        const size = 14 - i * 1.4
        const opacity = (1 - i / trailCount) * 0.5
        el.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.opacity = opacity
      })
    }

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMove)

    // Detect hoverable elements
    const clickables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-hover]'
    )
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-hover]')
        .forEach((el) => {
          el.removeEventListener('mouseenter', handleEnter)
          el.removeEventListener('mouseleave', handleLeave)
          el.addEventListener('mouseenter', handleEnter)
          el.addEventListener('mouseleave', handleLeave)
        })
    })
    observer.observe(document.body, { subtree: true, childList: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      observer.disconnect()
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Main orb */}
      <div
        ref={orbRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 36 : 20,
          height: isHovering ? 36 : 20,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          background: isHovering
            ? 'radial-gradient(circle, rgba(255,107,0,0.9), rgba(255,107,0,0.3))'
            : 'radial-gradient(circle, rgba(0,255,255,0.9), rgba(0,255,255,0.3))',
          boxShadow: isHovering
            ? '0 0 15px rgba(255,107,0,0.8), 0 0 40px rgba(255,107,0,0.4)'
            : '0 0 15px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.4)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Trailing particles */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 14 - i * 1.4,
            height: 14 - i * 1.4,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99998 - i,
            background: isHovering
              ? `rgba(255,107,0,${0.5 - i * 0.06})`
              : `rgba(0,255,255,${0.5 - i * 0.06})`,
            transition: `opacity 0.1s ease`,
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </>
  )
}
