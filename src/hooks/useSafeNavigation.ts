"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useSafeNavigation = () => {
  const router = useRouter()

  const navigateTo = useCallback(
    (path: string) => {
      console.log("[Safe Navigation] Navigating to:", path)

      // Add a small delay to ensure any ongoing animations complete
      setTimeout(() => {
        try {
          router.push(path)
        } catch (error) {
          console.warn("[Safe Navigation] Navigation error:", error)
          // Fallback to window.location if router fails
          window.location.href = path
        }
      }, 50)
    },
    [router],
  )

  const navigateBack = useCallback(() => {
    console.log("[Safe Navigation] Navigating back")

    setTimeout(() => {
      try {
        router.back()
      } catch (error) {
        console.warn("[Safe Navigation] Back navigation error:", error)
        window.history.back()
      }
    }, 50)
  }, [router])

  return { navigateTo, navigateBack }
}
