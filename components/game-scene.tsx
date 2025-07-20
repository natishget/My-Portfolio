"use client"

import type React from "react"

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Box, Sphere, Text } from "@react-three/drei"
import * as THREE from "three"

interface GameSceneProps {
  gameState: "menu" | "playing" | "paused" | "won" | "lost"
  onCubeCollected: () => void
  totalCubes: number
}

interface CollectibleCube {
  id: number
  position: [number, number, number]
  collected: boolean
  ref: React.RefObject<THREE.Mesh>
}

function Player({ gameState }: { gameState: string }) {
  const playerRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.code]: true }))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [event.code]: false }))
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!playerRef.current || gameState !== "playing") return

    const speed = 8 * delta
    const player = playerRef.current

    // Movement
    if (keys["KeyW"] || keys["ArrowUp"]) {
      player.position.z -= speed
    }
    if (keys["KeyS"] || keys["ArrowDown"]) {
      player.position.z += speed
    }
    if (keys["KeyA"] || keys["ArrowLeft"]) {
      player.position.x -= speed
    }
    if (keys["KeyD"] || keys["ArrowRight"]) {
      player.position.x += speed
    }
    if (keys["Space"]) {
      player.position.y += speed
    }
    if (keys["ShiftLeft"]) {
      player.position.y -= speed
    }

    // Boundaries
    player.position.x = Math.max(-15, Math.min(15, player.position.x))
    player.position.y = Math.max(0, Math.min(10, player.position.y))
    player.position.z = Math.max(-15, Math.min(15, player.position.z))

    // Camera follows player
    camera.position.lerp(new THREE.Vector3(player.position.x, player.position.y + 3, player.position.z + 8), 0.1)
    camera.lookAt(player.position)
  })

  return (
    <Sphere ref={playerRef} args={[0.5, 16, 16]} position={[0, 2, 0]}>
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
    </Sphere>
  )
}

function CollectibleCubes({
  cubes,
  onCollect,
  playerPosition,
}: {
  cubes: CollectibleCube[]
  onCollect: (id: number) => void
  playerPosition: THREE.Vector3
}) {
  useFrame((state) => {
    cubes.forEach((cube) => {
      if (cube.ref.current && !cube.collected) {
        // Rotate cubes
        cube.ref.current.rotation.x = state.clock.elapsedTime * 0.5
        cube.ref.current.rotation.y = state.clock.elapsedTime * 0.7

        // Float animation
        cube.ref.current.position.y = cube.position[1] + Math.sin(state.clock.elapsedTime * 2 + cube.id) * 0.5

        // Check collision with player
        const distance = cube.ref.current.position.distanceTo(playerPosition)
        if (distance < 1.2) {
          onCollect(cube.id)
        }
      }
    })
  })

  return (
    <>
      {cubes.map(
        (cube) =>
          !cube.collected && (
            <Box key={cube.id} ref={cube.ref} args={[0.8, 0.8, 0.8]} position={cube.position}>
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </Box>
          ),
      )}
    </>
  )
}

function GameEnvironment() {
  return (
    <>
      {/* Ground */}
      <Box args={[40, 0.2, 40]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#1e293b" transparent opacity={0.8} />
      </Box>

      {/* Boundary walls */}
      <Box args={[0.2, 15, 40]} position={[20, 7.5, 0]}>
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </Box>
      <Box args={[0.2, 15, 40]} position={[-20, 7.5, 0]}>
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </Box>
      <Box args={[40, 15, 0.2]} position={[0, 7.5, 20]}>
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </Box>
      <Box args={[40, 15, 0.2]} position={[0, 7.5, -20]}>
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </Box>

      {/* Decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.5, 8, 0.5]}
          position={[Math.cos((i / 8) * Math.PI * 2) * 12, 4, Math.sin((i / 8) * Math.PI * 2) * 12]}
        >
          <meshStandardMaterial color="#6366f1" transparent opacity={0.6} />
        </Box>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 15, 0]} intensity={0.8} color="#ffffff" />
    </>
  )
}

export const GameScene = forwardRef<any, GameSceneProps>(({ gameState, onCubeCollected, totalCubes }, ref) => {
  const playerRef = useRef<THREE.Mesh>(null)
  const [cubes, setCubes] = useState<CollectibleCube[]>([])
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 2, 0))

  const generateCubes = () => {
    const newCubes: CollectibleCube[] = []
    for (let i = 0; i < totalCubes; i++) {
      newCubes.push({
        id: i,
        position: [(Math.random() - 0.5) * 25, Math.random() * 8 + 2, (Math.random() - 0.5) * 25],
        collected: false,
        ref: { current: null },
      })
    }
    setCubes(newCubes)
  }

  useImperativeHandle(ref, () => ({
    resetGame: () => {
      generateCubes()
      setPlayerPosition(new THREE.Vector3(0, 2, 0))
    },
  }))

  useEffect(() => {
    generateCubes()
  }, [totalCubes])

  useFrame(() => {
    if (playerRef.current) {
      setPlayerPosition(playerRef.current.position.clone())
    }
  })

  const handleCubeCollect = (id: number) => {
    setCubes((prev) => prev.map((cube) => (cube.id === id ? { ...cube, collected: true } : cube)))
    onCubeCollected()
  }

  return (
    <>
      <GameEnvironment />
      <Player gameState={gameState} />
      <CollectibleCubes cubes={cubes} onCollect={handleCubeCollect} playerPosition={playerPosition} />

      {/* Game title in 3D space */}
      <Text
        position={[0, 12, -10]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        Cube Collector 3D
      </Text>
    </>
  )
})

GameScene.displayName = "GameScene"
