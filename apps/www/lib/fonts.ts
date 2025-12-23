import { JetBrains_Mono as FontMono } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

// Primary font - Geist Sans (Vercel's modern font)
export const fontSans = GeistSans

// Monospace font - Geist Mono (for code blocks)
export const fontMono = GeistMono

// Alternative monospace - JetBrains Mono
export const fontJetBrains = FontMono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})
