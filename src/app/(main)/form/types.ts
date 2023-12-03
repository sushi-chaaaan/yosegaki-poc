import type {
  YosegakiInputType,
  YosegakiSelectType,
} from "@/messages/types/yosegaki"

export type FormState = {
  initialValue: YosegakiSelectType
  value: YosegakiInputType | undefined
  error: {
    [K in keyof YosegakiInputType]?: string[]
  }
  message?: {
    type: "success" | "error"
    content: string
  }
}
