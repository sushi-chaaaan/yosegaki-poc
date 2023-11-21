import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import MessageForm from "@/app/(main)/form/components/messageForm"
import { getMessage } from "@/supabase/lib/message"
import { createClient } from "@/supabase/utils/serverClient"

export default async function FormWrapper() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()
  if (sessionError || sessionData.session == null) {
    console.error(sessionError)
    return redirect("/join")
  }
  const message = await getMessage(cookieStore, sessionData.session)
  // null => unauthorized
  if (message == null) return redirect("/join")

  return <MessageForm initialMessage={message} />
}
