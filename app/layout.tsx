import type { Metadata, Viewport } from "next"
import type React from "react"
import { MedicineSystemProvider } from "@/hooks/use-medicine-system"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Traditional Medicine AI Advisor - Korean & Ayurvedic Remedies",
  description: "Discover personalized herbal remedies based on Korean and Ayurvedic medicine. Get AI-powered health recommendations backed by traditional wisdom and modern research.",
  keywords: ["Korean medicine", "Ayurveda", "herbal remedies", "traditional medicine", "AI health advisor"],
  authors: [{ name: "Traditional Medicine AI Team" }],
  creator: "Traditional Medicine AI",
  publisher: "Traditional Medicine AI",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://traditionalmed-ai.vercel.app",
    title: "Traditional Medicine AI Advisor",
    description: "Personalized herbal remedies from Korean and Ayurvedic traditions",
    siteName: "Traditional Medicine AI Advisor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traditional Medicine AI Advisor",
    description: "Discover personalized herbal remedies",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Medicine AI Advisor",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#10b981",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MedicineSystemProvider>
          {children}
          <Toaster />
        </MedicineSystemProvider>
      </body>
    </html>
  )
}
