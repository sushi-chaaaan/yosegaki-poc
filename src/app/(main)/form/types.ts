import { YosegakiInputType } from "@/messages/types/yosegaki"

export type FormState = {
  value: YosegakiInputType | undefined
  error: {
    [K in keyof YosegakiInputType]?: string[]
  }
  message?: {
    type: "success" | "error"
    content: string
  }
}
