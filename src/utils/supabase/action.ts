"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

const signIn = async () => {
  const cookieStore = cookies()
  const header = headers()
  const origin = header.get("origin")
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `${origin}/auth/callback`,
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
