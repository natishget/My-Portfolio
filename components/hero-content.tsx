"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

export function HeroContent() {
  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Hello, I'm Natnael
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-white/90">Full Stack Developer</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with modern technologies. Specialized in React, Node.js, and real-time
            applications from Ethiopia 🇪🇹
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/projects">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
            >
              View My Work
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-200"
            >
              Get In Touch
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-12">
          <Link
            href="https://github.com/natnael"
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
          >
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/natnael"
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:natnael@example.com"
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
          >
            <Mail className="h-6 w-6" />
          </Link>
          <Link
            href="https://wa.me/251900000000"
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
          <Link
            href="https://t.me/natnael_dev"
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
          >
            <Send className="h-6 w-6" />
          </Link>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 mx-auto text-white/60" />
        </div>
      </div>
    </div>
  )
}
