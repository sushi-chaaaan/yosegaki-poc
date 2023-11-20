import { cookies } from "next/headers"
import Link from "next/link"

import SignInButton from "@/components/supabase/signInButton"
import { buttonVariants } from "@/components/ui/styles/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/supabase/utils/serverClient"

export default async function FormButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const user = await supabase.auth.getUser()

  return (
    <div>
      {user.data ? (
        <Link
          className={cn(buttonVariants({ className: "no-underline" }))}
          href="/form"
        >
          <span>フォームへ(要Twitterアカウント)</span>
        </Link>
      ) : (
        <SignInButton redirectTo="/form">
          <span>フォームへ(要Twitterアカウント)</span>
        </SignInButton>
      )}
    </div>
  )
}
