"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Shield,
  Network,
} from "lucide-react";
import { FloatingElements } from "@/components/floating-elements";
import { Footer } from "@/components/footer";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="h-6 w-6" />,
      color: "text-blue-400",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 80 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Code className="h-6 w-6" />,
      color: "text-green-400",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "PHP", level: 80 },
        { name: "GraphQL", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "Socket.IO", level: 70 },
      ],
    },
    {
      title: "Database & Storage",
      icon: <Database className="h-6 w-6" />,
      color: "text-purple-400",
      skills: [
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 60 },
        { name: "Redis", level: 50 },
        { name: "Firebase", level: 60 },
      ],
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      color: "text-cyan-400",
      skills: [
        { name: "Flutter", level: 50 },
        { name: "React Native", level: 65 },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Network className="h-6 w-6" />,
      color: "text-yellow-400",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "Linux", level: 85 },
        { name: "Networking", level: 80 },
        { name: "AWS", level: 50 },
      ],
    },
  ];

  const certifications = ["Python Programming - Coursera"];

  const tools = [
    "VS Code",
    "Git",
    "Postman",
    "Figma",
    "Adobe Photoshop",
    "Docker",
    "Vite",
    "ESLint",
    "Prettier",
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
              My <span className="text-purple-400">Skills</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise and proficiency
              levels across various technologies and domains.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`${category.color} mr-3`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="hover:transform hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/80 text-sm">
                            {skill.name}
                          </span>
                          <span className="text-white/60 text-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-white/20 text-white/80 hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center hover:transform hover:translate-x-2 transition-transform duration-200"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience Summary */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-3xl font-semibold text-white mb-6 text-center">
                Experience Highlights
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="hover:transform hover:scale-110 transition-transform duration-200">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    1+
                  </div>
                  <div className="text-white/80">Years of Experience</div>
                </div>
                <div className="hover:transform hover:scale-110 transition-transform duration-200">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    10+
                  </div>
                  <div className="text-white/80">Projects Completed</div>
                </div>
                <div className="hover:transform hover:scale-110 transition-transform duration-200">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    10+
                  </div>
                  <div className="text-white/80">Technologies Mastered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
