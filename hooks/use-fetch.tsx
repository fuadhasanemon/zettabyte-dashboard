"use client"

import { useState, useEffect, useCallback } from "react"

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      let errorMessage = "An unexpected error occurred"

      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMessage = "Network error: Unable to connect to the server"
        } else if (err.message.includes("HTTP error")) {
          errorMessage = `Server error: ${err.message}`
        } else {
          errorMessage = err.message
        }
      }

      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
