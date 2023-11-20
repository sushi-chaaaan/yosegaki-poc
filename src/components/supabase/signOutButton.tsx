"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/supabase/action"

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>ログアウト</Button>
  )
}

export default SignOutButton
