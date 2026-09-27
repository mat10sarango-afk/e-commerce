import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Barlow_Condensed, Inter } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "PULSE — Performance Gear",
  description: "Premium athletic apparel and performance gear.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans bg-[#F2F2F2] text-black">
        <main className="relative min-h-screen">{props.children}</main>
      </body>
    </html>
  )
}
