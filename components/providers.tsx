"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { SidebarProvider } from "@/contexts/sidebar-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  )
}
