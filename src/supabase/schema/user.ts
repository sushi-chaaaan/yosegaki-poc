import { pgTable, text, uuid } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull().default(""),
  display_name: text("display_name").notNull().default(""),
  avatar_url: text("avatar_url"),
})
