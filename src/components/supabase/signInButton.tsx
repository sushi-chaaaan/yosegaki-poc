"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "@/utils/supabase/action"

const SignInButton = () => {
  return <Button onClick={() => signIn("/form")}>Twitterでログイン</Button>
}

export default SignInButton
