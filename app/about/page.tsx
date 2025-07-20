"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Award } from "lucide-react";
import { FloatingElements } from "@/components/floating-elements";
import { Footer } from "@/components/footer";

export default function About() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Afrobin Logistics",
      period: "2023 - Present",
      description:
        "Developing logistics management systems and real-time tracking solutions",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
      title: "Freelance Developer",
      company: "Various Clients",
      period: "2022 - Present",
      description:
        "Built websites for Kermen Aluminium, Dallol Aluminium, and Addis Life Real Estate",
      technologies: ["PHP", "MySQL", "JavaScript", "CSS"],
    },
  ];

  const achievements = [
    "Built GPS-based driver tracking system with real-time updates",
    "Developed stock management system using FIFO strategy",
    "Created multiple corporate websites for Ethiopian businesses",
    "Self-taught developer with continuous learning mindset",
    "Coursera certificates in Python and Cybersecurity",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <FloatingElements />
      <Navigation />

      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header with animation */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-purple-400">Natnael</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A passionate full-stack developer from Ethiopia, dedicated to
              creating innovative digital solutions that bridge technology and
              real-world needs.
            </p>
          </div>

          {/* Personal Info with hover effects */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Personal Info
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-white/80 hover:text-white transition-colors">
                      <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                      <span>Based in Ethiopia</span>
                    </div>
                    <div className="flex items-center text-white/80 hover:text-white transition-colors">
                      <Building className="h-5 w-5 mr-3 text-cyan-400" />
                      <span>Full Stack Developer</span>
                    </div>
                    <div className="flex items-center text-white/80 hover:text-white transition-colors">
                      <Award className="h-5 w-5 mr-3 text-yellow-400" />
                      <span>Self-taught & Certified</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Specializations
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "React Native",
                      "Flutter",
                      "Node.js",
                      "Express",
                      "Next.js",
                      "MongoDB",
                      "MySQL",
                      "PHP",
                      "GraphQL",
                      "REST APIs",
                      "Socket.IO",
                    ].map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30 transition-colors cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Timeline with stagger animation */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="text-purple-400">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-white/60 mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-white/70 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start hover:transform hover:translate-x-2 transition-transform duration-200"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-white/80">{achievement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
