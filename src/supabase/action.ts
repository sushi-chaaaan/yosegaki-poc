"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/supabase/utils/serverClient"
import { getSiteUrl } from "@/supabase/utils/url"

const signIn = async (redirectTo?: string) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const authCallbackUrl = new URL(
    "/auth/callback",
    getSiteUrl({ addTrailingSlash: false }),
  )
  authCallbackUrl.searchParams.append("redirectTo", redirectTo ?? "/")

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: authCallbackUrl.toString(),
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
