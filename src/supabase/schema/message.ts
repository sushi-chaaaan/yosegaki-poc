import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const message = pgTable("message", {
  id: uuid("id").primaryKey().notNull(),
  content: text("content").notNull(),
  file_name: text("file_name"),
  accepted: boolean("accepted").notNull(),
})

export const messageInsertSchema = createInsertSchema(message, {
  id: (s) => s.id.uuid(),
  content: z
    .string({
      invalid_type_error: "寄せ書き本文を入力してください。",
    })
    .min(1, { message: "本文を入力してください。" })
    .max(2000, { message: "本文は2000文字以内で入力してください。" }),
})

export type messageInsertType = z.infer<typeof messageInsertSchema>
