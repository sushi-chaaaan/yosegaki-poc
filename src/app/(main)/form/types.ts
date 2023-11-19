import { z } from "zod"

export const MessageSchema = z.object({
  content: z
    .string({
      invalid_type_error: "寄せ書き本文を入力してください。",
    })
    .min(1, { message: "本文を入力してください。" })
    .max(2000, {
      message: "本文は2000文字以内で入力してください。",
    }),
  file: z
    .custom<FileList>()
    .optional()
    .transform((value) => (value ? value[0] : undefined))
    .refine(
      (value) =>
        value === undefined ||
        (value !== undefined && value.type.startsWith("image/")),
      {
        message: "画像ファイルを選択してください。",
      },
    ),
})

export type Message = z.infer<typeof MessageSchema>

export type FormState = {
  value: Message | undefined
  error: {
    [K in keyof Message]?: string[]
  }
  message?: string
}
