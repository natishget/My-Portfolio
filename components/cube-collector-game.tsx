"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useRef, useEffect } from "react"
import { OrbitControls, Environment } from "@react-three/drei"
import { GameScene } from "@/components/game-scene"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Pause, Trophy, Target } from "lucide-react"

export function CubeCollectorGame() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "won" | "lost">("menu")
  const [score, setScore] = useState(0)
  const [totalCubes] = useState(15)
  const [timeLeft, setTimeLeft] = useState(60)
  const [bestScore, setBestScore] = useState(0)
  const gameRef = useRef<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("cubeCollectorBest")
    if (saved) setBestScore(Number.parseInt(saved))
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("lost")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(60)
    if (gameRef.current) {
      gameRef.current.resetGame()
    }
  }

  const pauseGame = () => {
    setGameState(gameState === "paused" ? "playing" : "paused")
  }

  const resetGame = () => {
    setGameState("menu")
    setScore(0)
    setTimeLeft(60)
  }

  const onCubeCollected = () => {
    const newScore = score + 1
    setScore(newScore)

    if (newScore >= totalCubes) {
      setGameState("won")
      const finalScore = newScore * timeLeft // Bonus for time remaining
      if (finalScore > bestScore) {
        setBestScore(finalScore)
        localStorage.setItem("cubeCollectorBest", finalScore.toString())
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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
                <span className="text-white text-sm font-medium">
                  {score}/{totalCubes}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm font-medium">⏱️ {formatTime(timeLeft)}</span>
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
              Start Game
            </Button>
          )}

          {(gameState === "playing" || gameState === "paused") && (
            <>
              <Button
                onClick={pauseGame}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Pause className="h-4 w-4 mr-2" />
                {gameState === "paused" ? "Resume" : "Pause"}
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </>
          )}

          {(gameState === "won" || gameState === "lost") && (
            <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          )}
        </div>
      </div>

      {/* Game Canvas */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[600px]">
            <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <GameScene
                  ref={gameRef}
                  gameState={gameState}
                  onCubeCollected={onCubeCollected}
                  totalCubes={totalCubes}
                />
                <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
              </Suspense>
            </Canvas>

            {/* Game Overlays */}
            {gameState === "menu" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Cube Collector 3D</h2>
                  <p className="text-lg mb-6">Collect all the glowing cubes before time runs out!</p>
                  <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Play className="h-5 w-5 mr-2" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}

            {gameState === "paused" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
                  <Button onClick={pauseGame} size="lg" className="bg-green-600 hover:bg-green-700">
                    Resume Game
                  </Button>
                </div>
              </div>
            )}

            {gameState === "won" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-4xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-lg mb-2">You collected all cubes!</p>
                  <p className="text-xl font-bold text-purple-400 mb-6">Final Score: {score * timeLeft}</p>
                  <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Play Again
                  </Button>
                </div>
              </div>
            )}

            {gameState === "lost" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-2 text-red-400">Time's Up!</h2>
                  <p className="text-lg mb-2">
                    You collected {score}/{totalCubes} cubes
                  </p>
                  <p className="text-sm text-white/70 mb-6">Try to be faster next time!</p>
                  <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Game Tips */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-4">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-2">💡 Pro Tips:</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-white/70">
            <p>• Move quickly but carefully to collect all cubes</p>
            <p>• Use mouse to look around and spot distant cubes</p>
            <p>• Time bonus is added to your final score</p>
            <p>• Try to beat your best score!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
