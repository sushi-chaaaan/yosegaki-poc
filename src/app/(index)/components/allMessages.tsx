import { unstable_cache } from "next/cache"

import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import MessageCard from "@/components/messageCard"
import { getAllValidYosegaki } from "@/messages/lib/yosegaki"

export default async function AllMessages() {
  const getCachedAcceptedMessages = unstable_cache(
    async () => {
      console.log("AllMessages: cache miss")
      return await getAllValidYosegaki()
    },
    ["all-accepted-messages-display-to-top-page"],
    {
      tags: [ACCEPTED_MESSAGES_CACHE_TAG],
      revalidate: 3600,
    },
  )
  const messages = await getCachedAcceptedMessages()

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
      {messages.map((message) => (
        <MessageCard key={message.user.id} yosegaki={message} />
      ))}
    </div>
  )
}
