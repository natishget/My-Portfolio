"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box, Torus, Icosahedron, Octahedron, Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#8b5cf6" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const icosahedronRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = state.clock.elapsedTime * 0.3
      icosahedronRef.current.rotation.z = state.clock.elapsedTime * 0.2
      icosahedronRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = state.clock.elapsedTime * 0.4
      octahedronRef.current.rotation.x = state.clock.elapsedTime * 0.3
      octahedronRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central wireframe sphere */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </Sphere>

      {/* Floating icosahedron */}
      <Icosahedron ref={icosahedronRef} args={[0.8]} position={[3, 1, 0]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} />
      </Icosahedron>

      {/* Floating octahedron */}
      <Octahedron ref={octahedronRef} args={[0.6]} position={[-3, -1, 0]}>
        <meshStandardMaterial color="#f59e0b" transparent opacity={0.8} />
      </Octahedron>

      {/* Orbiting torus */}
      <Torus args={[2.5, 0.1, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
      </Torus>

      {/* Smaller orbiting torus */}
      <Torus args={[1.8, 0.05, 12, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#f59e0b" transparent opacity={0.5} />
      </Torus>

      {/* Floating cubes in formation */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          args={[0.15, 0.15, 0.15]}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 4,
            Math.sin((i / 12) * Math.PI * 2) * 2,
            Math.sin((i / 12) * Math.PI * 4) * 1.5,
          ]}
        >
          <meshStandardMaterial
            color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b"}
            transparent
            opacity={0.8}
          />
        </Box>
      ))}
    </group>
  )
}

export function EnhancedHeroScene() {
  return (
    <>
      <ParticleField />
      <FloatingGeometry />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#f59e0b" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow color="#ffffff" />
    </>
  )
}
