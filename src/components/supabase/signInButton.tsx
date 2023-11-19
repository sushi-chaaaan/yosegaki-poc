"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "@/utils/supabase/action"

type SignInButtonProps = {
  redirectTo?: string
  children?: React.ReactNode
}

const SignInButton = ({ redirectTo, children }: SignInButtonProps) => {
  return (
    <Button onClick={() => signIn(redirectTo)}>
      {children ? children : <span>Twitterでログイン</span>}
    </Button>
  )
}

export default SignInButton
