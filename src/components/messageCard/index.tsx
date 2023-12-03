import Image from "next/image"

import styles from "@/components/messageCard/message-card.module.scss"
import UserInfo from "@/components/messageCard/userInfo"
import { cn } from "@/lib/utils"
import { YosegakiSelectType } from "@/messages/types/yosegaki"

type Props = {
  yosegaki: YosegakiSelectType
  priorityLoading?: boolean
}

const MessageCard = ({
  yosegaki: { user, image, message },
  priorityLoading,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn("not-prose", styles.container)} key={user.id}>
        <UserInfo user={user} />
        <p className="whitespace-pre-wrap">{message?.content}</p>
        {image && (
          <div className="relative aspect-golden w-full overflow-hidden">
            <Image
              alt={image.name}
              className="object-contain"
              fill
              priority={priorityLoading}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              src={image.url}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageCard
