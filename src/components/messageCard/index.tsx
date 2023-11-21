import Image from "next/image"

import styles from "@/components/messageCard/message-card.module.scss"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileWithUrl, User } from "@/messages/types"

type Props = {
  user: User
  content: string
  file?: FileWithUrl
  priorityLoading?: boolean
}

const MessageCard = ({ user, content, file, priorityLoading }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn("not-prose", styles.container)} key={user.id}>
        <div className="flex flex-row flex-nowrap items-center gap-x-4">
          <Avatar>
            <AvatarImage alt={`avatar of ${user.name}`} src={user.avatar_url} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold">{user.name}</span>
        </div>
        <p>{content}</p>
        <div className="relative aspect-golden w-full overflow-hidden">
          {file && (
            <Image
              alt={file.name}
              className="object-contain"
              fill
              priority={priorityLoading}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              src={file.url}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageCard
