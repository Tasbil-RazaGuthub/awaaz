import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Noto_Sans_Bengali, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Awaaz — Voice-First Health Companion",
  description:
    "Awaaz gives South Asian migrant workers in the Gulf a voice: outbreak alerts, culture-matched tele-consults, safe audio circles, and gamified health training — voice-first, low-bandwidth, in 8 languages. Prototype for the Sydney Innovation Challenge 2026 (SDG 3).",
  keywords: ["Awaaz", "SDG 3", "migrant health", "telehealth", "GCC", "voice-first", "Sydney Innovation Challenge 2026"],
  authors: [{ name: "Awaaz — SIC 2026 entry" }],
  openGraph: {
    title: "Awaaz — آواز — a voice-first health companion",
    description: "Outbreak alerts, $0.05 voice consults, safe audio circles, and health training for 19M South Asian workers in the Gulf.",
    siteName: "Awaaz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} ${notoBengali.variable} ${notoDevanagari.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
