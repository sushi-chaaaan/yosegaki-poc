"use client"

import { usePathname, useRouter } from "next/navigation"
import NProgress from "nprogress"
import { useEffect } from "react"

export default function RefreshProgress() {
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    console.log("pathName", pathName)
    NProgress.done()
  }, [pathName, router])

  return <></>
}
