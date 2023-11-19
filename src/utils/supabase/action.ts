"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { env } from "@/env.mjs"
import { createClient } from "@/utils/supabase/server"

const signIn = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `${env.VERCEL_URL}/auth/callback`,
      skipBrowserRedirect: true,
    },
  })
  if (data.url) redirect(data.url)
}

const signOut = async () => {
  const cookieStore = cookies()

  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  redirect("/")
}

export { signIn, signOut }
