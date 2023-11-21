import { Message } from "@/messages/types"

export type FormState = {
  value: Message | undefined
  error: {
    [K in keyof Message]?: string[]
  }
  message?: string
}
