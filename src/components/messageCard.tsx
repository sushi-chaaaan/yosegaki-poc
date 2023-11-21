import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileWithUrl, User } from "@/messages/types"

type Props = {
  user: User
  content: string
  file?: FileWithUrl
}

const MessageCard = ({ user, content, file }: Props) => {
  return (
    <div
      className="not-prose flex flex-col flex-nowrap gap-y-8 rounded-lg border border-yellow-400 bg-yellow-200 p-4"
      key={user.id}
    >
      <div className="flex flex-row flex-nowrap items-center gap-x-4">
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold">{user.name}</span>
      </div>
      <p>{content}</p>
      <div className="relative aspect-video w-full overflow-hidden rounded">
        {file && (
          <Image
            alt={file.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            src={file.url}
          />
        )}
      </div>
    </div>
  )
}

export default MessageCard
