"use client"

import { SessionProvider } from "next-auth/react"

export function SessionAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionAuthProvider>
      {children}
    </SessionAuthProvider>
  )
}
