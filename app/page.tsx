"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { Environment, OrbitControls } from "@react-three/drei"
import { EnhancedHeroScene } from "@/components/enhanced-hero-scene"
import { Navigation } from "@/components/navigation"
import { HeroContent } from "@/components/hero-content"
import { AboutPreview } from "@/components/about-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { ContactPreview } from "@/components/contact-preview"
import { Footer } from "@/components/footer"
import { LoadingAnimation } from "@/components/loading-animation"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      {/* Hero Section with Enhanced 3D Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <EnhancedHeroScene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>
        <HeroContent />
      </section>

      {/* About Preview */}
      <AboutPreview />

      {/* Projects Preview */}
      <ProjectsPreview />

      {/* Contact Preview */}
      <ContactPreview />

      {/* Footer */}
      <Footer />
    </div>
  )
}
