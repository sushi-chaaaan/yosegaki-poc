import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const message = pgTable("message", {
  id: uuid("id").primaryKey().notNull(),
  content: text("content").notNull().default(""),
  file_name: text("file_name"),
  accepted: boolean("accepted").notNull().default(false),
})
