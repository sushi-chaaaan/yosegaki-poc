import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import MessageForm from "@/app/(main)/form/components/messageForm"
import { getMessage } from "@/lib/message"

export default async function FormWrapper() {
  const cookieStore = cookies()
  const message = await getMessage(cookieStore)

  // null => unauthorized
  if (message == null) return redirect("/join")

  return <MessageForm initialMessage={message} />
}
