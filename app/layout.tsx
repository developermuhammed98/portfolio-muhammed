import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import DotFieldBackground from "@/components/DotFieldBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Muhammed Bülbül — Web Developer",
  description: "React.js, Next.js, Laravel ile modern ve responsive web uygulamaları geliştiren Web Developer. İstanbul.",
  keywords: ["web developer", "React.js", "Next.js", "Laravel", "frontend", "İstanbul"],
  authors: [{ name: "Muhammed Bülbül" }],
  openGraph: {
    title: "Muhammed Bülbül — Web Developer",
    description: "React.js, Next.js, Laravel ile modern ve responsive web uygulamaları geliştiren Web Developer. İstanbul.",
    url: "https://muhammedbulbul.dev",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Muhammed Bülbül Portfolio Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Bülbül — Web Developer",
    description: "React.js, Next.js, Laravel ile modern ve responsive web uygulamaları geliştiren Web Developer. İstanbul.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Dynamic DotField Background (React Bits) */}
        <DotFieldBackground />

        {/* Ambient Glow Follower */}
        <div
          id="ambient-glow"
          aria-hidden="true"
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 2,
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
            background: `radial-gradient(
              circle,
              rgba(34,211,238, 0.055)  0%,
              rgba(139,92,246, 0.035) 40%,
              transparent             70%
            )`,
            willChange: 'transform',
            transition: 'opacity 600ms ease',
          }}
        />

        {/* Depth glow */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(99,102,241,0.07)_0%,transparent_65%)]" />

        {/* Noise overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.022] z-50 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

        {/* Line numbers sidebar (lg breakpoint only) */}
        <div className="hidden lg:block fixed left-4 top-0 h-screen w-8 pointer-events-none select-none z-10 font-mono text-[11px] text-slate-500/6 leading-[24px] pt-4 overflow-hidden">
          {Array.from({ length: 99 }, (_, i) => (
            <div key={i} className="text-right pr-2">
              {(i + 1).toString().padStart(2, "0")}
            </div>
          ))}
        </div>


        {children}
      </body>
    </html>
  );
}
