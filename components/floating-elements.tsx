"use client"

import { useEffect, useState } from "react"
import { Code, Database, Globe, Smartphone, Shield, Network } from "lucide-react"

const icons = [Code, Database, Globe, Smartphone, Shield, Network]

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 6 }).map((_, i) => {
        const Icon = icons[i]
        return (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Icon className="h-8 w-8 text-purple-400" />
          </div>
        )
      })}
    </div>
  )
}
