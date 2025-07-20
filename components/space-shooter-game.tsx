"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useRef, useEffect } from "react"
import { Environment } from "@react-three/drei"
import { SpaceShooterScene } from "@/components/space-shooter-scene"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Trophy, Target, Heart, Zap } from "lucide-react"

export function SpaceShooterGame() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameOver">("menu")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [bestScore, setBestScore] = useState(0)
  const [wave, setWave] = useState(1)
  const gameRef = useRef<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("spaceShooterBest")
    if (saved) setBestScore(Number.parseInt(saved))
  }, [])

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setLives(3)
    setWave(1)
    if (gameRef.current) {
      gameRef.current.resetGame()
    }
  }

  const gameOver = () => {
    setGameState("gameOver")
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("spaceShooterBest", score.toString())
    }
  }

  const onScoreUpdate = (newScore: number) => {
    setScore(newScore)
  }

  const onLivesUpdate = (newLives: number) => {
    setLives(newLives)
    if (newLives <= 0) {
      gameOver()
    }
  }

  const onWaveUpdate = (newWave: number) => {
    setWave(newWave)
  }

  return (
    <div className="relative">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-purple-400" />
                <span className="text-white text-sm font-medium">Score: {score}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-white text-sm font-medium">Lives: {lives}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Wave: {wave}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Best: {bestScore}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="flex space-x-2">
          {gameState === "menu" && (
            <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
              <Play className="h-4 w-4 mr-2" />
              Start Mission
            </Button>
          )}

          {gameState === "gameOver" && (
            <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-4 w-4 mr-2" />
              Retry Mission
            </Button>
          )}

          {gameState === "playing" && (
            <Button
              onClick={() => setGameState("menu")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Abort Mission
            </Button>
          )}
        </div>
      </div>

      {/* Game Canvas */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[600px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <SpaceShooterScene
                  ref={gameRef}
                  gameState={gameState}
                  onGameOver={gameOver}
                  onScoreUpdate={onScoreUpdate}
                  onLivesUpdate={onLivesUpdate}
                  onWaveUpdate={onWaveUpdate}
                />
              </Suspense>
            </Canvas>

            {/* Game Overlays */}
            {gameState === "menu" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="mb-6">
                    <div className="text-6xl mb-4">🚀</div>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Mini Galaxy Defender</h2>
                  <p className="text-lg mb-2">🖱️ Move mouse to control your spaceship</p>
                  <p className="text-lg mb-2">🖱️ Left-click to shoot lasers</p>
                  <p className="text-sm text-white/70 mb-6">Destroy asteroids and enemy drones • Survive the waves!</p>
                  <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Play className="h-5 w-5 mr-2" />
                    Start Mission
                  </Button>
                </div>
              </div>
            )}

            {gameState === "gameOver" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">💥</div>
                  <h2 className="text-4xl font-bold mb-2 text-red-400">Mission Failed!</h2>
                  <p className="text-lg mb-2">Final Score: {score}</p>
                  <p className="text-lg mb-2">Waves Survived: {wave - 1}</p>
                  {score === bestScore && score > 0 && (
                    <p className="text-yellow-400 font-bold mb-4">🎉 New High Score!</p>
                  )}
                  <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Retry Mission
                  </Button>
                </div>
              </div>
            )}

            {/* Controls instruction overlay for playing state */}
            {gameState === "playing" && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                <p className="text-lg font-bold animate-pulse">Move Mouse • Left-Click to Shoot! 🚀</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Game Instructions */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-4">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-3">🚀 Mission Briefing:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">🖱️</div>
              <span>Move mouse to control your spaceship</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">🔫</div>
              <span>Left-click to fire laser weapons</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">🪨</div>
              <span>Destroy asteroids for 10 points each</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">👾</div>
              <span>Eliminate enemy drones for 25 points</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">⚡</div>
              <span>Survive waves - difficulty increases!</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">❤️</div>
              <span>You have 3 lives - don't get hit!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
