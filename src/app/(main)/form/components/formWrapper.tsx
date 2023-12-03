import { redirect } from "next/navigation"

import MessageForm from "@/app/(main)/form/components/messageForm"
import { getYosegaki } from "@/messages/lib/yosegaki"
import { getServerSession } from "@/supabase/lib/session"

export default async function FormWrapper() {
  const { data: sessionData, error: sessionError } = await getServerSession()
  if (sessionError || sessionData.session == null) {
    console.error(sessionError)
    return redirect("/join")
  }

  const message = await getYosegaki(sessionData.session.user.id)
  if (message == null) return redirect("/join")

  return <MessageForm initialYosegaki={message} />
}
