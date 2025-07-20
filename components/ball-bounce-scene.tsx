"use client"

import type React from "react"

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, Torus, Box, Text } from "@react-three/drei"
import type * as THREE from "three"

interface BallBounceSceneProps {
  gameState: "menu" | "playing" | "gameOver"
  onGameOver: () => void
  onScoreUpdate: (score: number) => void
}

interface GameObject {
  id: number
  position: [number, number, number]
  type: "ring" | "obstacle"
  collected?: boolean
  ref: React.RefObject<THREE.Mesh>
}

function Ball({ gameState, onBounce }: { gameState: string; onBounce: () => void }) {
  const ballRef = useRef<THREE.Mesh>(null)
  const [velocity, setVelocity] = useState(0)
  const [position, setPosition] = useState(0)
  const { size } = useThree()

  useEffect(() => {
    if (gameState === "playing") {
      const handleClick = () => {
        onBounce()
        setVelocity(0.15) // Bounce strength
      }

      window.addEventListener("click", handleClick)
      window.addEventListener("touchstart", handleClick)

      return () => {
        window.removeEventListener("click", handleClick)
        window.removeEventListener("touchstart", handleClick)
      }
    }
  }, [gameState, onBounce])

  useFrame((state, delta) => {
    if (!ballRef.current || gameState !== "playing") return

    // Apply gravity
    setVelocity((prev) => prev - 0.008) // Gravity

    // Update position
    setPosition((prev) => {
      const newPos = prev + velocity
      ballRef.current!.position.y = newPos
      return newPos
    })

    // Ball rotation for visual effect
    ballRef.current.rotation.x += velocity * 10
    ballRef.current.rotation.z += velocity * 5

    // Check if ball fell too low (game over)
    if (position < -6) {
      // Game over
    }
  })

  // Reset ball position when game starts
  useEffect(() => {
    if (gameState === "playing") {
      setPosition(0)
      setVelocity(0)
      if (ballRef.current) {
        ballRef.current.position.y = 0
      }
    }
  }, [gameState])

  return (
    <Sphere ref={ballRef} args={[0.3, 16, 16]} position={[0, position, 0]}>
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
    </Sphere>
  )
}

function GameObjects({
  objects,
  ballPosition,
  onCollect,
  onHitObstacle,
}: {
  objects: GameObject[]
  ballPosition: number
  onCollect: (id: number) => void
  onHitObstacle: () => void
}) {
  useFrame((state, delta) => {
    objects.forEach((obj) => {
      if (obj.ref.current && !obj.collected) {
        // Move objects down
        obj.ref.current.position.y -= 2 * delta

        // Rotate rings
        if (obj.type === "ring") {
          obj.ref.current.rotation.z += delta * 2
        }

        // Check collision with ball
        const distance = Math.abs(obj.ref.current.position.y - ballPosition)
        if (distance < 0.5 && Math.abs(obj.ref.current.position.x) < 0.5) {
          if (obj.type === "ring") {
            onCollect(obj.id)
          } else if (obj.type === "obstacle") {
            onHitObstacle()
          }
        }

        // Remove objects that are too far down
        if (obj.ref.current.position.y < -8) {
          obj.ref.current.visible = false
        }
      }
    })
  })

  return (
    <>
      {objects.map((obj) => {
        if (obj.collected) return null

        if (obj.type === "ring") {
          return (
            <Torus key={obj.id} ref={obj.ref} args={[0.6, 0.1, 8, 16]} position={obj.position}>
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.4} />
            </Torus>
          )
        } else {
          return (
            <Box key={obj.id} ref={obj.ref} args={[1.2, 0.2, 0.2]} position={obj.position}>
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
            </Box>
          )
        }
      })}
    </>
  )
}

function GameEnvironment() {
  return (
    <>
      {/* Background elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere key={i} args={[0.05, 8, 8]} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, -5]}>
          <meshStandardMaterial color="#6366f1" transparent opacity={0.3} />
        </Sphere>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#ffffff" />
    </>
  )
}

export const BallBounceScene = forwardRef<any, BallBounceSceneProps>(
  ({ gameState, onGameOver, onScoreUpdate }, ref) => {
    const [objects, setObjects] = useState<GameObject[]>([])
    const [score, setScore] = useState(0)
    const [ballPosition, setBallPosition] = useState(0)
    const [gameTime, setGameTime] = useState(0)
    const ballRef = useRef<THREE.Mesh>(null)

    const generateObject = () => {
      const isRing = Math.random() > 0.3 // 70% chance for ring, 30% for obstacle
      const newObject: GameObject = {
        id: Date.now() + Math.random(),
        position: [(Math.random() - 0.5) * 3, 8, 0],
        type: isRing ? "ring" : "obstacle",
        collected: false,
        ref: { current: null },
      }
      setObjects((prev) => [...prev, newObject])
    }

    useImperativeHandle(ref, () => ({
      resetGame: () => {
        setObjects([])
        setScore(0)
        setGameTime(0)
        setBallPosition(0)
      },
    }))

    // Game loop
    useFrame((state, delta) => {
      if (gameState === "playing") {
        setGameTime((prev) => prev + delta)

        // Update ball position
        if (ballRef.current) {
          setBallPosition(ballRef.current.position.y)

          // Check if ball fell too low
          if (ballRef.current.position.y < -5) {
            onGameOver()
          }
        }

        // Generate new objects periodically
        if (Math.random() < 0.02) {
          // 2% chance per frame
          generateObject()
        }

        // Clean up old objects
        setObjects((prev) => prev.filter((obj) => obj.ref.current?.position.y > -10))
      }
    })

    const handleCollect = (id: number) => {
      setObjects((prev) => prev.map((obj) => (obj.id === id ? { ...obj, collected: true } : obj)))
      const newScore = score + 10
      setScore(newScore)
      onScoreUpdate(newScore)
    }

    const handleHitObstacle = () => {
      onGameOver()
    }

    const handleBounce = () => {
      // This is handled in the Ball component
    }

    return (
      <>
        <GameEnvironment />
        <Ball gameState={gameState} onBounce={handleBounce} />
        <GameObjects
          objects={objects}
          ballPosition={ballPosition}
          onCollect={handleCollect}
          onHitObstacle={handleHitObstacle}
        />

        {/* Game title */}
        <Text
          position={[0, 6, -2]}
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
        >
          Ball Bounce 3D
        </Text>

        {/* Score display in 3D */}
        {gameState === "playing" && (
          <Text
            position={[0, 5, -2]}
            fontSize={0.5}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            Score: {score}
          </Text>
        )}
      </>
    )
  },
)

BallBounceScene.displayName = "BallBounceScene"
