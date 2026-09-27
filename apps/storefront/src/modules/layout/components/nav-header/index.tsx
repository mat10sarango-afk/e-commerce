"use client"

import { clx } from "@modules/common/components/ui"
import { ReactNode, useEffect, useState } from "react"

const NavHeader = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header
        className={clx(
          "relative mx-auto border-b border-white/10 text-white transition-all duration-300 ease-out",
          scrolled
            ? "h-12 bg-black/90 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
            : "h-16 bg-black"
        )}
      >
        {children}
      </header>
    </div>
  )
}

export default NavHeader
