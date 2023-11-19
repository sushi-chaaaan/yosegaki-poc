import { cookies } from "next/headers"

import MessageForm from "@/app/(main)/form/components/form"
import MaxWidth from "@/components/layout/maxWidth"
import { getMessage } from "@/lib/message"

export default async function Page() {
  const cookieStore = cookies()
  const message = await getMessage(cookieStore)

  return (
    <MaxWidth asChild type="content">
      <div>
        <span className="text-xl">Message Form Page</span>
        <MessageForm initialMessage={message} />
      </div>
    </MaxWidth>
  )
}
