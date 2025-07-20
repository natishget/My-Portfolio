"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { FloatingElements } from "@/components/floating-elements";
import { Footer } from "@/components/footer";
import ketar from "@/assets/ketar.jpg";

export default function Projects() {
  const projects = [
    {
      title: "Ketar Aluminum Website",
      description:
        "Corporate website for a leading aluminium manufacturing company in Ethiopia. Features product catalog, company information, and contact management system.",
      technologies: ["React", "Next.js", "Node.js", "TailwindCSS"],
      image: "/ketar.png",
      year: "2023",
      category: "Web Application",
      features: [
        "Real-time tracking",
        "Route optimization",
        "Fleet management",
        "Live notifications",
      ],
    },
    {
      title: "GPS Driver Tracking System",
      description:
        "Real-time GPS-based driver tracking system with live location updates, route optimization, and fleet management capabilities. Built with Google Maps API integration and WebSocket connections for instant updates.",
      technologies: [
        "React",
        "Node.js",
        "Socket.IO",
        "Google Maps API",
        "MongoDB",
        "Express",
        "Redux",
      ],
      image: "/placeholder.svg?height=300&width=500",
      year: "2023",
      category: "Web Application",
      features: [
        "Real-time tracking",
        "Route optimization",
        "Fleet management",
        "Live notifications",
      ],
    },
    {
      title: "Kermen Aluminium Website",
      description:
        "Corporate website for a leading aluminium manufacturing company in Ethiopia. Features product catalog, company information, and contact management system.",
      technologies: ["React", "JavaScript", "CSS", "Tailwind CSS"],
      image: "/kermen1.jpg",
      year: "2022",
      category: "Corporate Website",
      features: [
        "Product catalog",
        "Contact forms",
        "Company showcase",
        "Responsive design",
      ],
    },
    {
      title: "Stock Management System",
      description:
        "Comprehensive inventory management system implementing FIFO (First In, First Out) strategy with real-time stock level tracking, automated alerts, and detailed reporting.",
      technologies: ["React", "Node.js", "MySQL", "Express", "Chart.js"],
      image: "/kermen.jpg",
      year: "2023",
      category: "Management System",
      features: [
        "FIFO implementation",
        "Real-time tracking",
        "Automated alerts",
        "Detailed reports",
      ],
    },
    {
      title: "Dallol Aluminium Website",
      description:
        "Modern website for Dallol Aluminium featuring product galleries, service descriptions, and integrated contact system with inquiry management.",
      technologies: ["React", , "JavaScript", "CSS", "Tailwind CSS"],
      image: "/dallol.jpg",
      year: "2022",
      category: "Corporate Website",
      features: [
        "Product galleries",
        "Service showcase",
        "Inquiry system",
        "SEO optimized",
      ],
    },
    {
      title: "Addis Life Real Estate",
      description:
        "Real estate platform for property listings, virtual tours, and client management. Features advanced search filters and property comparison tools.",
      technologies: ["PHP", "MySQL", "JavaScript", "CSS", "Google Maps"],
      image: "/addis.jpg",
      year: "2022",
      category: "Real Estate Platform",
      features: [
        "Property listings",
        "Advanced search",
        "Virtual tours",
        "Client management",
      ],
    },
    {
      title: "Personal Portfolio v1",
      description:
        "My first portfolio website showcasing early projects and skills. Built with vanilla JavaScript and modern CSS techniques.",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      image: "/Portfolio.png",
      year: "2021",
      category: "Portfolio",
      features: [
        "Animated interactions",
        "Project showcase",
        "Contact forms",
        "Responsive design",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <FloatingElements />
      <Navigation />

      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              My <span className="text-purple-400">Projects</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A collection of projects that showcase my technical skills and
              problem-solving abilities. From real-time tracking systems to
              corporate websites.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-purple-600/80 text-white border-0">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center text-white/80 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-3 text-xl">
                    {project.title}
                  </CardTitle>
                  <p className="text-white/70 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 text-sm">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-xs text-white/60 hover:text-white/80 transition-colors"
                        >
                          <div className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs hover:bg-purple-600/30 transition-colors cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 flex-1 bg-transparent transform hover:scale-105 transition-all duration-200"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 flex-1 bg-transparent transform hover:scale-105 transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
