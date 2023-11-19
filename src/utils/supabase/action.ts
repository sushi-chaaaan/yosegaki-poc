"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { NEXT_PUBLIC_VERCEL_URL } from "@/utils/url"

const signIn = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `${NEXT_PUBLIC_VERCEL_URL}/auth/callback`,
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
