import { cookies } from "next/headers"

import MessageForm from "@/app/(main)/form/components/form"
import MaxWidth from "@/components/layout/maxWidth"
import SignInButton from "@/components/supabase/signInButton"
import { getMessage } from "@/lib/message"

export default async function Page() {
  const cookieStore = cookies()
  const message = await getMessage(cookieStore)

  return (
    <MaxWidth asChild type="content">
      <div className="prose">
        <h1>Message Form Page</h1>
        {!message && (
          <>
            <h2>この企画はTwitterでのログインが必要です。</h2>
            <SignInButton />
          </>
        )}
        {message && <MessageForm initialMessage={message} />}
      </div>
    </MaxWidth>
  )
}
