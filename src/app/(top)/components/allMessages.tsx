import { unstable_cache } from "next/cache"

import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import { getAllAcceptedMessages } from "@/lib/message"

export default async function AllMessages() {
  const getCachedAcceptedMessages = unstable_cache(
    async () => await getAllAcceptedMessages(),
    undefined,
    {
      tags: [ACCEPTED_MESSAGES_CACHE_TAG],
      revalidate: false,
    },
  )
  const messages = await getCachedAcceptedMessages()

  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}
