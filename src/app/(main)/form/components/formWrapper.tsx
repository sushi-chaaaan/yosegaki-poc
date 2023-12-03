import { redirect } from "next/navigation"

import MessageForm from "@/app/(main)/form/components/messageForm"
import { getYosegaki } from "@/messages/lib/yosegaki"
import { getServerSession } from "@/supabase/lib/session"

export default async function FormWrapper() {
  const { data, error } = await getServerSession()
  if (error || data.session == null) {
    console.error(error)
    return redirect("/join")
  }

  const message = await getYosegaki(data.session.user.id)
  // invalid user
  if (!message) return redirect("/join")
  return <MessageForm initialYosegaki={message} />
}
