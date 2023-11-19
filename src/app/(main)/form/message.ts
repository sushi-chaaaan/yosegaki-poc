import { z } from "zod"

const MessageSchema = z.object({
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
  file: z.any().optional(),
  // .refine(
  //   (files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type),
  //   "画像を選択してください。",
  // ),
})

export type FormValue = z.infer<typeof MessageSchema>

export { MessageSchema }
