import { z } from "zod"

const MessageSchema = z.object({
  title: z
    .string({
      invalid_type_error: "名前を入力してください。",
    })
    .min(1)
    .max(100, {
      message: "名前は100文字以内で入力してください。",
    }),
  content: z
    .string({
      invalid_type_error: "寄せ書き本文を入力してください。",
    })
    .min(1)
    .max(2000, {
      message: "本文は2000文字以内で入力してください。",
    }),
})

export { MessageSchema }
