import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SKILLS = [
  { name: 'Java',       color: '#FF6B00', radius: 3.2, speed: 0.6,  size: 0.28, tilt: 0.2  },
  { name: 'SQL',        color: '#00FFFF', radius: 4.8, speed: 0.45, size: 0.26, tilt: -0.15 },
  { name: 'JavaScript', color: '#FFE44D', radius: 6.2, speed: 0.32, size: 0.25, tilt: 0.3  },
  { name: 'Python',     color: '#7B3FFF', radius: 4.0, speed: 0.55, size: 0.27, tilt: -0.25 },
  { name: 'ML / AI',   color: '#FF3366', radius: 7.2, speed: 0.25, size: 0.30, tilt: 0.1  },
  { name: 'Git',        color: '#FF6B00', radius: 8.0, speed: 0.20, size: 0.24, tilt: -0.1 },
  { name: 'CSS',        color: '#00CCFF', radius: 2.4, speed: 0.9,  size: 0.22, tilt: 0.4  },
  { name: 'ServiceNow', color: '#AA44FF', radius: 9.0, speed: 0.15, size: 0.28, tilt: 0.2  },
]

/* ─── Orbit Ring ─── */
function OrbitRing({ radius, tilt = 0 }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])

  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <group rotation={[tilt, 0, 0]}>
      <line geometry={geom}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </line>
    </group>
  )
}

/* ─── Planet ─── */
function Planet({ skill, index, onHover, onLeave }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const glowRef = useRef()
  const angleOffset = (index / SKILLS.length) * Math.PI * 2

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const angle = t * skill.speed + angleOffset

    groupRef.current.position.x = Math.cos(angle) * skill.radius
    groupRef.current.position.z = Math.sin(angle) * skill.radius
    groupRef.current.position.y = Math.sin(t * 0.4 + index * 0.8) * 0.25

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.005
    }

    // Pulse glow
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2 + index) * 0.15
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[skill.size * 2.5, 16, 16]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.07} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Planet body */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(skill) }}
        onPointerLeave={onLeave}
      >
        <sphereGeometry args={[skill.size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Ring for some planets */}
      {index % 3 === 0 && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[skill.size * 1.6, 0.04, 8, 48]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}

/* ─── Central Node ─── */
function CentralNode() {
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.1
      coreRef.current.scale.setScalar(s)
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.5
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.3
  })

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={2} roughness={0} metalness={1} />
      </mesh>

      {/* Outer glows */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#4F00FF" transparent opacity={0.04} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Rotating rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.025, 8, 64]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 8, 64]} />
        <meshBasicMaterial color="#4F00FF" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

/* ─── Main Scene ─── */
export default function PlanetSkills({ onHoverSkill, onLeaveSkill }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight color="#00FFFF" intensity={6} position={[0, 0, 0]} distance={30} />
      <pointLight color="#4F00FF" intensity={3} position={[8, 8, 8]} distance={30} />
      <pointLight color="#FF6B00" intensity={2} position={[-8, -5, -8]} distance={20} />

      {/* Orbit rings */}
      {SKILLS.map((skill) => (
        <OrbitRing key={skill.name + '-ring'} radius={skill.radius} tilt={skill.tilt} />
      ))}

      {/* Central node */}
      <CentralNode />

      {/* Planets */}
      {SKILLS.map((skill, i) => (
        <Planet
          key={skill.name}
          skill={skill}
          index={i}
          onHover={onHoverSkill}
          onLeave={onLeaveSkill}
        />
      ))}
    </group>
  )
}
