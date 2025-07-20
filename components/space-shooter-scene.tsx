"use client"

import type React from "react"
import * as THREE from "three"
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Box, Sphere, Cone, Text } from "@react-three/drei"

interface SpaceShooterSceneProps {
  gameState: "menu" | "playing" | "gameOver"
  onGameOver: () => void
  onScoreUpdate: (score: number) => void
  onLivesUpdate: (lives: number) => void
  onWaveUpdate: (wave: number) => void
}

interface Projectile {
  id: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  ref: React.RefObject<THREE.Mesh>
}

interface Enemy {
  id: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  type: "asteroid" | "drone"
  health: number
  ref: React.RefObject<THREE.Mesh>
}

function Spaceship({ gameState, onShoot }: { gameState: string; onShoot: (position: THREE.Vector3) => void }) {
  const shipRef = useRef<THREE.Mesh>(null)
  const { mouse, size } = useThree()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (gameState === "playing") {
      const handleLeftClick = (event: MouseEvent) => {
        event.preventDefault()
        if (shipRef.current) {
          onShoot(shipRef.current.position.clone())
        }
      }

      window.addEventListener("click", handleLeftClick)

      return () => {
        window.removeEventListener("click", handleLeftClick)
      }
    }
  }, [gameState, onShoot])

  useFrame(() => {
    if (!shipRef.current || gameState !== "playing") return

    // Convert mouse position to world coordinates
    const x = (mouse.x * size.width) / 100
    const y = (mouse.y * size.height) / 100

    // Smooth movement
    shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, x * 3, 0.1)
    shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, y * 2, 0.1)

    // Tilt based on movement
    shipRef.current.rotation.z = -x * 0.3
    shipRef.current.rotation.x = y * 0.2

    // Keep within bounds
    shipRef.current.position.x = Math.max(-6, Math.min(6, shipRef.current.position.x))
    shipRef.current.position.y = Math.max(-3, Math.min(3, shipRef.current.position.y))
  })

  return (
    <group ref={shipRef} position={[0, -2, 0]}>
      {/* Main body */}
      <Cone args={[0.3, 1, 8]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
      </Cone>
      {/* Wings */}
      <Box args={[1.2, 0.1, 0.3]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </Box>
      {/* Engine glow */}
      <Sphere args={[0.1, 8, 8]} position={[0, -0.6, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
      </Sphere>
    </group>
  )
}

function Projectiles({ projectiles }: { projectiles: Projectile[] }) {
  useFrame((state, delta) => {
    projectiles.forEach((projectile) => {
      if (projectile.ref.current) {
        projectile.position.add(projectile.velocity.clone().multiplyScalar(delta))
        projectile.ref.current.position.copy(projectile.position)
      }
    })
  })

  return (
    <>
      {projectiles.map((projectile) => (
        <Sphere key={projectile.id} ref={projectile.ref} args={[0.05, 8, 8]} position={projectile.position.toArray()}>
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
        </Sphere>
      ))}
    </>
  )
}

function Enemies({ enemies }: { enemies: Enemy[] }) {
  useFrame((state, delta) => {
    enemies.forEach((enemy) => {
      if (enemy.ref.current) {
        enemy.position.add(enemy.velocity.clone().multiplyScalar(delta))
        enemy.ref.current.position.copy(enemy.position)

        // Rotate enemies
        enemy.ref.current.rotation.x += delta * 2
        enemy.ref.current.rotation.y += delta * 1.5
      }
    })
  })

  return (
    <>
      {enemies.map((enemy) => {
        if (enemy.type === "asteroid") {
          return (
            <Box key={enemy.id} ref={enemy.ref} args={[0.8, 0.8, 0.8]} position={enemy.position.toArray()}>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>
          )
        } else {
          return (
            <group key={enemy.id} ref={enemy.ref} position={enemy.position.toArray()}>
              <Box args={[0.6, 0.3, 0.6]}>
                <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.3} />
              </Box>
              <Sphere args={[0.2, 8, 8]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
              </Sphere>
            </group>
          )
        }
      })}
    </>
  )
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.1
    }
  })

  const starPositions = new Float32Array(1000 * 3)
  for (let i = 0; i < 1000; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={starPositions} count={1000} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.1} sizeAttenuation={false} />
    </points>
  )
}

export const SpaceShooterScene = forwardRef<any, SpaceShooterSceneProps>(
  ({ gameState, onGameOver, onScoreUpdate, onLivesUpdate, onWaveUpdate }, ref) => {
    const [projectiles, setProjectiles] = useState<Projectile[]>([])
    const [enemies, setEnemies] = useState<Enemy[]>([])
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [wave, setWave] = useState(1)
    const [enemiesInWave, setEnemiesInWave] = useState(0)
    const [enemiesKilled, setEnemiesKilled] = useState(0)
    const shipRef = useRef<THREE.Mesh>(null)

    const spawnEnemy = () => {
      const isAsteroid = Math.random() > 0.3
      const newEnemy: Enemy = {
        id: Date.now() + Math.random(),
        position: new THREE.Vector3((Math.random() - 0.5) * 10, 6, 0),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 2, -2 - wave * 0.3, 0),
        type: isAsteroid ? "asteroid" : "drone",
        health: isAsteroid ? 1 : 2,
        ref: { current: null },
      }
      setEnemies((prev) => [...prev, newEnemy])
    }

    const shoot = (position: THREE.Vector3) => {
      const newProjectile: Projectile = {
        id: Date.now() + Math.random(),
        position: position.clone(),
        velocity: new THREE.Vector3(0, 15, 0),
        ref: { current: null },
      }
      setProjectiles((prev) => [...prev, newProjectile])
    }

    useImperativeHandle(ref, () => ({
      resetGame: () => {
        setProjectiles([])
        setEnemies([])
        setScore(0)
        setLives(3)
        setWave(1)
        setEnemiesInWave(0)
        setEnemiesKilled(0)
      },
    }))

    // Game loop
    useFrame((state, delta) => {
      if (gameState === "playing") {
        // Spawn enemies for current wave
        if (enemiesInWave < wave * 5 && Math.random() < 0.02 + wave * 0.005) {
          spawnEnemy()
          setEnemiesInWave((prev) => prev + 1)
        }

        // Check wave completion
        if (enemiesInWave >= wave * 5 && enemies.length === 0) {
          setWave((prev) => {
            const newWave = prev + 1
            onWaveUpdate(newWave)
            return newWave
          })
          setEnemiesInWave(0)
          setEnemiesKilled(0)
        }

        // Collision detection
        projectiles.forEach((projectile) => {
          enemies.forEach((enemy) => {
            if (projectile.ref.current && enemy.ref.current && projectile.position.distanceTo(enemy.position) < 0.8) {
              // Hit enemy
              enemy.health -= 1
              if (enemy.health <= 0) {
                // Remove enemy
                setEnemies((prev) => prev.filter((e) => e.id !== enemy.id))
                setEnemiesKilled((prev) => prev + 1)

                // Update score
                const points = enemy.type === "asteroid" ? 10 : 25
                const newScore = score + points
                setScore(newScore)
                onScoreUpdate(newScore)
              }

              // Remove projectile
              setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
            }
          })
        })

        // Check enemy collision with player
        enemies.forEach((enemy) => {
          if (enemy.ref.current && enemy.position.y < -1.5 && Math.abs(enemy.position.x) < 1) {
            // Player hit
            setLives((prev) => {
              const newLives = prev - 1
              onLivesUpdate(newLives)
              return newLives
            })
            setEnemies((prev) => prev.filter((e) => e.id !== enemy.id))
          }
        })

        // Clean up off-screen objects
        setProjectiles((prev) => prev.filter((p) => p.position.y < 10))
        setEnemies((prev) => prev.filter((e) => e.position.y > -8))
      }
    })

    return (
      <>
        <StarField />
        <Spaceship gameState={gameState} onShoot={shoot} />
        <Projectiles projectiles={projectiles} />
        <Enemies enemies={enemies} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#06b6d4" />

        {/* Game title */}
        <Text
          position={[0, 4, -5]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
        >
          Mini Galaxy Defender
        </Text>
      </>
    )
  },
)

SpaceShooterScene.displayName = "SpaceShooterScene"
