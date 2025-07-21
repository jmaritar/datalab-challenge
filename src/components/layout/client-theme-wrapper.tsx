"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ClientThemeWrapperProps {
  children: React.ReactNode
}

export function ClientThemeWrapper({ children }: ClientThemeWrapperProps) {
  const [activeThemeValue, setActiveThemeValue] = useState<string>("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return ""
    }

    const themeValue = getCookie("active_theme") || ""
    setActiveThemeValue(themeValue)
  }, [])

  if (!isClient) {
    return <div>{children}</div>
  }

  const isScaled = activeThemeValue.endsWith("-scaled")

  return (
    <div className={cn(activeThemeValue ? `theme-${activeThemeValue}` : "", isScaled ? "theme-scaled" : "")}>
      {children}
    </div>
  )
}
