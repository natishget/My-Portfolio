"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box, Torus } from "@react-three/drei"
import type * as THREE from "three"

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main central sphere */}
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.6} />
      </Sphere>

      {/* Orbiting torus */}
      <Torus ref={torusRef} args={[2, 0.1, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.8} />
      </Torus>

      {/* Floating cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.2, 0.2, 0.2]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 2) * 2,
            Math.sin((i / 8) * Math.PI * 4) * 1,
          ]}
        >
          <meshStandardMaterial color="#f59e0b" transparent opacity={0.7} />
        </Box>
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
    </group>
  )
}
