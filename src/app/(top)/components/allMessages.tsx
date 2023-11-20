import { getAllAcceptedMessages } from "@/lib/message"

export default async function AllMessages() {
  const messages = await getAllAcceptedMessages()

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
