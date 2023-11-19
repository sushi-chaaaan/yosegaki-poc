"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { getSiteUrl } from "@/utils/supabase/url"

const signIn = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `${getSiteUrl({ addTrailingSlash: false })}/auth/callback`,
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
