"use client"

import { useEffect, useState } from "react"

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    setLocation(window.location)
  }, [])

  return location
}

export { useLocation }
