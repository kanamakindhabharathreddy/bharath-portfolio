import { useEffect, useRef, useState } from 'react'

/**
 * useMouseParallax — tracks normalized mouse position (-1 to 1)
 * and returns smooth interpolated values for parallax effects.
 */
export default function useMouseParallax(strength = 0.05) {
  const mouse = useRef({ x: 0, y: 0 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    let current = { x: 0, y: 0 }
    const animate = () => {
      current.x += (mouse.current.x - current.x) * strength
      current.y += (mouse.current.y - current.y) * strength
      setParallax({ x: current.x, y: current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return parallax
}
