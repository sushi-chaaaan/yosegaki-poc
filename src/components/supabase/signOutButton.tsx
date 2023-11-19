"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/utils/supabase/action"

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>ログアウト</Button>
  )
}

export default SignOutButton
