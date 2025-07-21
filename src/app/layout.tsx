import type React from "react"
import Providers from "@/components/layout/providers"
import { Toaster } from "@/components/ui/sonner"
import { fontVariables } from "@/lib/font"
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import NextTopLoader from "nextjs-toploader"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"
import "./theme.css"
import { ClientThemeWrapper } from "@/components/layout/client-theme-wrapper"

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const metadata: Metadata = {
  title: "DataLab Challenge",
  description: "Challenge",
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn("bg-background overflow-hidden overscroll-none font-sans antialiased", fontVariables)}
        suppressHydrationWarning
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <ClientThemeWrapper>
              <Providers activeThemeValue="">
                <Toaster />
                {children}
              </Providers>
            </ClientThemeWrapper>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
