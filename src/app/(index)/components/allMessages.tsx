import { unstable_cache } from "next/cache"

import MessageColumn from "@/app/(index)/components/messageColumn"
import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import { getAllValidYosegaki } from "@/messages/lib/yosegaki"
import { chunkArrayWithIndexMod } from "@/utils/array"

const MAX_GRID_COLUMNS = 2

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
    // NOTICE: grid cols must be lte MAX_GRID_COLUMNS
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      {chunkArrayWithIndexMod(messages, MAX_GRID_COLUMNS).map(
        (messageChunk, i) => (
          <MessageColumn
            key={`MessageColumn-${i}`}
            yosegakiArray={messageChunk}
          />
        ),
      )}
    </div>
  )
}
