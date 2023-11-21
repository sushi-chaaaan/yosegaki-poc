import { z } from "zod"

export const MessageBaseSchema = z.object({
  content: z
    .string({
      invalid_type_error: "寄せ書き本文を入力してください。",
    })
    .min(1, { message: "本文を入力してください。" })
    .max(2000, {
      message: "本文は2000文字以内で入力してください。",
    }),
})

export const MessageSchema = MessageBaseSchema.extend({
  file: z
    .custom<File>()
    .optional()
    // fix image validation
    .refine(
      (value) =>
        value === undefined ||
        (value !== undefined && value.type.startsWith("image/")),
      {
        message: "画像ファイルを選択してください。",
      },
    ),
})

const FileWithUrlSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  avatar_url: z.string().url(),
})
export const DownloadedMessageSchema = MessageBaseSchema.extend({
  file: FileWithUrlSchema.optional(),
  user: userSchema,
})

export type Message = z.infer<typeof MessageSchema>
export type User = z.infer<typeof userSchema>
export type FileWithUrl = z.infer<typeof FileWithUrlSchema>
export type DownloadedMessage = z.infer<typeof DownloadedMessageSchema>
