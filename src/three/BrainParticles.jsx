import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useMouseParallax from '../hooks/useMouseParallax'

/* ─── Neural Network Brain Particles ─── */
export default function BrainParticles({ exploded = false, count = 6000 }) {
  const pointsRef = useRef()
  const linesRef = useRef()
  const mouse = useMouseParallax(0.03)
  const timeRef = useRef(0)
  const explodeRef = useRef(exploded)
  const explodeProgress = useRef(0)

  // Responsive count
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768
    ? Math.floor(count * 0.35)
    : count

  // Build brain shape using parametric equations
  const { positions, originalPositions, galaxyPositions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const origPos = new Float32Array(particleCount * 3)
    const galPos = new Float32Array(particleCount * 3)
    const cols = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Brain shape: superellipsoid-ish with neural bumps
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      // Layered brain lobes
      const r = 2.5 + 0.3 * Math.sin(phi * 4) * Math.cos(theta * 3)
        + 0.15 * Math.sin(phi * 8) * Math.cos(theta * 6)
        + 0.4 * Math.random()

      const sinPhi = Math.sin(phi)
      let x = r * sinPhi * Math.cos(theta)
      let y = r * Math.cos(phi) * 0.85 // slightly flattened vertically
      let z = r * sinPhi * Math.sin(theta) * 0.75

      // Clamp top of brain (hemisphere shape)
      if (y < -1.2) y = -1.2 - (y + 1.2) * 0.3

      // Cerebral sulci (grooves)
      x += 0.05 * Math.sin(y * 3 + theta * 5)
      z += 0.05 * Math.cos(y * 3 + theta * 5)

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      origPos[i * 3]     = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z

      // Galaxy target positions
      const galTheta = Math.random() * Math.PI * 2
      const galR = (Math.random() ** 0.5) * 20
      const spiral = galTheta + galR * 0.3
      galPos[i * 3]     = Math.cos(spiral) * galR
      galPos[i * 3 + 1] = (Math.random() - 0.5) * 4
      galPos[i * 3 + 2] = Math.sin(spiral) * galR

      // Colors: cyan to indigo gradient based on position
      const t = (y + 3) / 6
      cols[i * 3]     = t * 0.3       // R
      cols[i * 3 + 1] = 0.8 + t * 0.2 // G
      cols[i * 3 + 2] = 1.0           // B
    }

    return { positions: pos, originalPositions: origPos, galaxyPositions: galPos, colors: cols }
  }, [particleCount])

  // Synapse lines geometry
  const linesGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    // We'll update this per frame
    const maxLines = 500
    const linePositions = new Float32Array(maxLines * 6)
    geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geom.setDrawRange(0, 0)
    return geom
  }, [])

  useEffect(() => {
    explodeRef.current = exploded
  }, [exploded])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    timeRef.current += delta

    const t = timeRef.current
    const pPos = pointsRef.current.geometry.attributes.position.array

    // Handle explosion/reform
    if (explodeRef.current && explodeProgress.current < 1) {
      explodeProgress.current = Math.min(1, explodeProgress.current + delta * 0.4)
    } else if (!explodeRef.current && explodeProgress.current > 0) {
      explodeProgress.current = Math.max(0, explodeProgress.current - delta * 0.5)
    }

    const ep = explodeProgress.current
    // Ease
    const ease = ep < 0.5 ? 4 * ep * ep * ep : 1 - Math.pow(-2 * ep + 2, 3) / 2

    // Sine wave pulse
    const pulse = 1 + Math.sin(t * 1.5) * 0.04

    for (let i = 0; i < particleCount; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]
      const gx = galaxyPositions[i * 3]
      const gy = galaxyPositions[i * 3 + 1]
      const gz = galaxyPositions[i * 3 + 2]

      // Rotate brain slowly
      const angle = t * 0.15
      const rotX = ox * Math.cos(angle) - oz * Math.sin(angle)
      const rotZ = ox * Math.sin(angle) + oz * Math.cos(angle)

      pPos[i * 3]     = (rotX * pulse) * (1 - ease) + gx * ease
      pPos[i * 3 + 1] = (oy * pulse)  * (1 - ease) + gy * ease
      pPos[i * 3 + 2] = (rotZ * pulse) * (1 - ease) + gz * ease
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Mouse parallax
    pointsRef.current.rotation.y += (mouse.x * 0.3 - pointsRef.current.rotation.y) * 0.05
    pointsRef.current.rotation.x += (-mouse.y * 0.15 - pointsRef.current.rotation.x) * 0.05

    // Draw synapse lines between nearby particles (only when not exploded)
    if (!explodeRef.current && linesRef.current) {
      const lineArr = linesRef.current.geometry.attributes.position.array
      let lineCount = 0
      const maxLinesPerFrame = 200
      const threshold = 0.9

      for (let i = 0; i < particleCount && lineCount < maxLinesPerFrame; i += 15) {
        for (let j = i + 15; j < particleCount && lineCount < maxLinesPerFrame; j += 15) {
          const dx = pPos[i * 3] - pPos[j * 3]
          const dy = pPos[i * 3 + 1] - pPos[j * 3 + 1]
          const dz = pPos[i * 3 + 2] - pPos[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < threshold) {
            const base = lineCount * 6
            lineArr[base]     = pPos[i * 3]
            lineArr[base + 1] = pPos[i * 3 + 1]
            lineArr[base + 2] = pPos[i * 3 + 2]
            lineArr[base + 3] = pPos[j * 3]
            lineArr[base + 4] = pPos[j * 3 + 1]
            lineArr[base + 5] = pPos[j * 3 + 2]
            lineCount++
          }
        }
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.setDrawRange(0, lineCount * 2)
    }
  })

  return (
    <group>
      {/* Synapse lines */}
      <lineSegments ref={linesRef} geometry={linesGeom}>
        <lineBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>

      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
