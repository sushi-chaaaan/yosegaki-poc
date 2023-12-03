import Skeleton from "react-loading-skeleton"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { YosegakiSelectType } from "@/messages/types/yosegaki"

type Props = {
  user: YosegakiSelectType["user"]
}

const UserInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-x-2">
      <Avatar className="items-center justify-center">
        <AvatarImage
          alt={`avatar of ${user.display_name}`}
          src={user.avatar_url ?? undefined}
        />
        <AvatarFallback>
          <Skeleton circle height={40} width={40} />
        </AvatarFallback>
      </Avatar>
      <span className="text-lg">{user.display_name}</span>
    </div>
  )
}

export default UserInfo
