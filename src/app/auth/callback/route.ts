import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { upsertUser } from "@/messages/lib/user"
import { SessionNotFoundError } from "@/supabase/error"
import { createClient } from "@/supabase/utils/serverClient"

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !session) {
      const err = error ?? new SessionNotFoundError()
      console.error(err)
      return
    }

    await upsertUser({
      id: session.user.id,
      name: session.user.user_metadata.user_name,
      display_name: session.user.user_metadata.name,
      avatar_url: session.user.user_metadata.avatar_url,
    })
  }

  // URL to redirect to after sign in process completes
  const url = new URL(redirectTo ?? "/", requestUrl.origin)
  return NextResponse.redirect(url)
}
