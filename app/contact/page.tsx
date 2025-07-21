"use client";

import type React from "react";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageCircle,
  Linkedin,
  Github,
  MapPin,
  SendIcon,
} from "lucide-react";
import { FloatingElements } from "@/components/floating-elements";
import { Footer } from "@/components/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.subject === "" ||
      formData.message === ""
    ) {
      alert("fill the Form properly");
    } else {
      try {
        const myMessage = `service request: %0A - Full Name: ${formData.name}%0A - Email: ${formData.email}%0A - Phone: ${formData.phone}%0A - Subject: ${formData.subject}%0A - Message: ${formData.message}%0A%0A%0A Powered By ByteForge!!`;

        const token = "7505532466:AAEdUza-Ig3QzHLDO4BsEQisGN5N9uRZJLQ";
        const chat_id = -1002430679323;
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${myMessage}&parse_mode=html`;

        let api = new XMLHttpRequest();
        api.open("GET", url, true);
        api.send();
        alert("sent");
      } catch (error) {
        console.log(error);
      }
    }
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "natishget@gmail.com",
      link: "mailto:natishget@gmail.com",
      color: "text-purple-400",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      value: "+251 983780984",
      link: "https://wa.me/251983780984",
      color: "text-green-400",
    },
    {
      icon: <SendIcon className="h-6 w-6" />,
      title: "Telegram",
      value: "@natishget",
      link: "https://t.me/natishget",
      color: "text-blue-400",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      value: "https://www.linkedin.com/in/natnael-getachew-natish/",
      link: "https://www.linkedin.com/in/natnael-getachew-natish/",
      color: "text-blue-500",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      value: "github.com/natishget",
      link: "https://github.com/natishget",
      color: "text-gray-400",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Addis Ababa, Ethiopia",
      link: "#",
      color: "text-red-400",
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
              Get In <span className="text-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's discuss your project and
              create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Send Me a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white/80">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white/80">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-white/80">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-colors"
                      placeholder="Project discussion"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white/80">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] focus:bg-white/15 transition-colors"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <SendIcon className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.link}
                        target="_blank"
                        className="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group transform hover:scale-[1.02]"
                      >
                        <div
                          className={`${info.color} mr-4 group-hover:scale-110 transition-transform duration-200`}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {info.title}
                          </div>
                          <div className="text-white/70 text-sm">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Let's Work Together
                  </h2>
                  <p className="text-white/70 mb-6">
                    I'm always interested in new opportunities and exciting
                    projects. Whether you need a full-stack developer, have a
                    project in mind, or just want to connect, I'd love to hear
                    from you.
                  </p>
                  <div className="space-y-2 text-sm text-white/60">
                    <p className="hover:text-white/80 transition-colors">
                      • Available for freelance projects
                    </p>
                    <p className="hover:text-white/80 transition-colors">
                      • Open to full-time opportunities
                    </p>
                    <p className="hover:text-white/80 transition-colors">
                      • Remote work preferred
                    </p>
                    <p className="hover:text-white/80 transition-colors">
                      • Quick response time
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
