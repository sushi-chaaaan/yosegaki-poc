import { z } from "zod"

export const MessageSchema = z.object({
  title: z
    .string({
      invalid_type_error: "タイトルを入力してください。",
    })
    .min(1, {
      message: "タイトルを入力してください。",
    })
    .max(100, {
      message: "タイトルは100文字以内で入力してください。",
    }),
  content: z
    .string({
      invalid_type_error: "寄せ書き本文を入力してください。",
    })
    .min(1, { message: "本文を入力してください。" })
    .max(2000, {
      message: "本文は2000文字以内で入力してください。",
    }),
  file: z.custom<File | undefined>(
    (value) => {
      if (value === undefined) return true
      if (value instanceof Blob && value.type.startsWith("image/")) {
        return true
      }
      return false
    },
    {
      message: "ファイルを選択してください。",
    },
  ),
})

export type FormValue = z.infer<typeof MessageSchema>

export type FormState = {
  value: FormValue | undefined
  error: {
    [K in keyof FormValue]?: string[]
  }
  message?: string
}
