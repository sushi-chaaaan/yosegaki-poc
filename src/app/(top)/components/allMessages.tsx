import { unstable_cache } from "next/cache"

import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import Message from "@/components/messageCard"
import { getAllAcceptedMessages } from "@/supabase/lib/message"

export default async function AllMessages() {
  const getCachedAcceptedMessages = unstable_cache(
    async () => await getAllAcceptedMessages(),
    ["all-accepted-messages-display-to-top-page"],
    {
      tags: [ACCEPTED_MESSAGES_CACHE_TAG],
      revalidate: 3600,
    },
  )
  const messages = await getCachedAcceptedMessages()

  return (
    <div className="grid grid-cols-1 p-4 md:grid-cols-2 xl:grid-cols-3">
      {messages.map((message) => (
        <Message key={message.user.id} {...message} />
      ))}
    </div>
  )
}
