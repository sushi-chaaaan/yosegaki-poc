import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { Avatar } from "@/components/ui/avatar"
import type { YosegakiSelectType } from "@/messages/types/yosegaki"

type Props = {
  user: YosegakiSelectType["user"]
}

const UserInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-x-4">
      <Avatar className="items-center justify-center">
        <AvatarImage
          alt={`avatar of ${user.display_name}`}
          src={user.avatar_url ?? undefined}
        />
        <AvatarFallback>{user.display_name}</AvatarFallback>
      </Avatar>
      <span className="text-xl font-bold">{user.display_name}</span>
    </div>
  )
}

export default UserInfo
