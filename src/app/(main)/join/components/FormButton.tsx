import Link from "next/link"

import SignInButton from "@/components/supabase/signInButton"
import { buttonVariants } from "@/components/ui/styles/button"
import { getServerSession } from "@/supabase/lib/session"

export default async function FormButton() {
  const {
    data: { session },
  } = await getServerSession()

  return (
    <div>
      {session ? (
        <Link
          className={buttonVariants({ className: "no-underline" })}
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
