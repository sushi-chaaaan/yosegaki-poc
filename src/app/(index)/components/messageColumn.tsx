import MessageCard from "@/components/messageCard"
import { YosegakiSelectType } from "@/messages/types/yosegaki"

type Props = {
  yosegakiArray: YosegakiSelectType[]
}

const MessageColumn = ({ yosegakiArray }: Props) => {
  return (
    <div className="flex flex-col flex-nowrap">
      {yosegakiArray.map((yosegaki) => (
        <MessageCard key={yosegaki.user.id} yosegaki={yosegaki} />
      ))}
    </div>
  )
}

export default MessageColumn
