import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const user = pgTable("user", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull().default(""),
  display_name: text("display_name").notNull().default(""),
  avatar_url: text("avatar_url"),
})

export const userInsertSchema = createInsertSchema(user)

export type userInsertType = z.infer<typeof userInsertSchema>

export const userSelectSchema = createSelectSchema(user)
export type userSelectType = z.infer<typeof userSelectSchema>
