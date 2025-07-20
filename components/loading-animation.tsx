"use client"

import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Text } from "@react-three/drei"
import type * as THREE from "three"

function LoadingGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 2
    }

    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.y = Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.5
        sphere.rotation.x = state.clock.elapsedTime * (i + 1)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) sphereRefs.current[i] = el
          }}
          args={[0.1, 16, 16]}
          position={[Math.cos((i / 8) * Math.PI * 2) * 1.5, 0, Math.sin((i / 8) * Math.PI * 2) * 1.5]}
        >
          <meshStandardMaterial color="#8b5cf6" />
        </Sphere>
      ))}
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        Loading...
      </Text>
    </group>
  )
}

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="w-64 h-64">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <LoadingGeometry />
        </Canvas>
      </div>
    </div>
  )
}
