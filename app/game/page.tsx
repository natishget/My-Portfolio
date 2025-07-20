"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SpaceShooterGame } from "@/components/space-shooter-game"
import { FloatingElements } from "@/components/floating-elements"

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <FloatingElements />
      <Navigation />

      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mini <span className="text-purple-400">Galaxy Defender</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
              Defend the galaxy from incoming asteroids and enemy drones! Control your spaceship with the mouse and
              left-click to shoot.
            </p>
          </div>

          {/* Game Container */}
          <SpaceShooterGame />
        </div>
      </div>

      <Footer />
    </div>
  )
}
