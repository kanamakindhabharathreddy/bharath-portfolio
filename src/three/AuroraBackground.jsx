import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Aurora Background — layered moving planes with gradient shaders ─── */
export default function AuroraBackground() {
  const auroraRefs = useRef([])

  const layers = useMemo(() => [
    { color1: new THREE.Color('#4F00FF'), color2: new THREE.Color('#00FFFF'), y: -5, z: -20, speed: 0.1,  phase: 0 },
    { color1: new THREE.Color('#7B3FFF'), color2: new THREE.Color('#00B8FF'), y: -8, z: -25, speed: 0.07, phase: 1.2 },
    { color1: new THREE.Color('#2D00A8'), color2: new THREE.Color('#00FFFF'), y: -3, z: -22, speed: 0.13, phase: 2.4 },
  ], [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    auroraRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const layer = layers[i]
      mesh.position.x = Math.sin(t * layer.speed + layer.phase) * 6
      mesh.position.y = layer.y + Math.cos(t * layer.speed * 0.7 + layer.phase) * 1.5
      mesh.rotation.z = Math.sin(t * layer.speed * 0.5) * 0.15
      mesh.material.opacity = 0.06 + Math.sin(t * 0.5 + layer.phase) * 0.02
    })
  })

  return (
    <group>
      {layers.map((layer, i) => (
        <mesh
          key={i}
          ref={(el) => (auroraRefs.current[i] = el)}
          position={[0, layer.y, layer.z]}
        >
          <planeGeometry args={[80, 30, 1, 1]} />
          <meshBasicMaterial
            color={layer.color1}
            transparent
            opacity={0.07}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Star field */}
      <Stars />
    </group>
  )
}

/* ─── Stars ─── */
function Stars() {
  const ref = useRef()

  const { positions, sizes } = useMemo(() => {
    const count = 3000
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
      sz[i] = Math.random() * 0.05 + 0.01
    }
    return { positions: pos, sizes: sz }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005
      ref.current.rotation.x = clock.getElapsedTime() * 0.002
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.06}
        transparent
        opacity={0.6}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
