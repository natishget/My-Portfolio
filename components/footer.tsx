"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, MessageCircle, Send, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/natnael", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/natnael", label: "LinkedIn" },
    { icon: Mail, href: "mailto:natnael@example.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/251900000000", label: "WhatsApp" },
    { icon: Send, href: "https://t.me/natnael", label: "Telegram" },
  ]

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer className="relative bg-black/40 backdrop-blur-md border-t border-white/10">
      {/* Floating back to top button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 rounded-full p-3 shadow-lg"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold text-white mb-4 block">
              Natnael<span className="text-purple-400">.dev</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Full Stack Developer from Ethiopia, crafting digital experiences with modern technologies. Specialized in
              React, Node.js, and real-time applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-white/60 hover:text-purple-400 transition-colors duration-200 hover:scale-110 transform"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="text-white/60">📧 natnael@example.com</p>
              <p className="text-white/60">📱 +251 9XX XXX XXX</p>
              <p className="text-white/60">📍 Addis Ababa, Ethiopia</p>
              <p className="text-white/60">💬 Available for freelance</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Natnael Getachew. Made with <Heart className="inline h-4 w-4 text-red-400 mx-1" />
            in Ethiopia
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
    </footer>
  )
}
