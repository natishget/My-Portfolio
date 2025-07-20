import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Natnael Getachew - Full Stack Developer | React, Node.js Expert",
    template: "%s | Natnael Getachew",
  },
  description:
    "Full Stack Developer from Ethiopia specializing in React, Node.js, MongoDB, and modern web technologies. Expert in GPS tracking systems, real-time applications, and corporate websites. Available for freelance projects.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "JavaScript Expert",
    "MongoDB",
    "MySQL",
    "PHP Developer",
    "Flutter Developer",
    "GraphQL",
    "REST API",
    "Socket.IO",
    "Real-time Applications",
    "GPS Tracking Systems",
    "Ethiopia Developer",
    "Freelance Developer",
    "Web Development",
    "Mobile Development",
    "Natnael Getachew",
  ],
  authors: [{ name: "Natnael Getachew", url: "https://natnael.dev" }],
  creator: "Natnael Getachew",
  publisher: "Natnael Getachew",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://natnael.dev",
    title: "Natnael Getachew - Full Stack Developer | React, Node.js Expert",
    description:
      "Full Stack Developer from Ethiopia specializing in React, Node.js, and modern web technologies. Expert in GPS tracking systems and real-time applications.",
    siteName: "Natnael Getachew Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Natnael Getachew - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natnael Getachew - Full Stack Developer",
    description: "Full Stack Developer from Ethiopia specializing in React, Node.js, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@natnael_dev",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://natnael.dev",
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Natnael Getachew",
  jobTitle: "Full Stack Developer",
  description: "Full Stack Developer from Ethiopia specializing in React, Node.js, and modern web technologies",
  url: "https://natnael.dev",
  sameAs: ["https://github.com/natnael", "https://linkedin.com/in/natnael", "https://twitter.com/natnael_dev"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "Ethiopia",
  },
  knowsAbout: [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "MySQL",
    "PHP",
    "Flutter",
    "GraphQL",
    "REST API",
    "Socket.IO",
    "GPS Tracking Systems",
    "Real-time Applications",
    "Web Development",
    "Mobile Development",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href="https://natnael.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
