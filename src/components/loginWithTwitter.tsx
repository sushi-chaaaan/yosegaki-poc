import { ThemeSupa } from "@supabase/auth-ui-shared"
import { headers } from "next/headers"

import AuthWrapper from "@/components/supabase/authWrapper"

export default function LoginWithTwitter() {
  const header = headers()
  const origin = header.get("origin")

  return (
    <AuthWrapper
      appearance={{ theme: ThemeSupa }}
      onlyThirdPartyProviders
      providers={["twitter"]}
      redirectTo={`${origin}/auth/callback`}
    />
  )
}
