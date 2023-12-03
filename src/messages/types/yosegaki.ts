import { z } from "zod"

import { ImageInputSchema, ImageOutputSchema } from "@/messages/types/image"
import {
  messageInsertSchema,
  messageSelectSchema,
} from "@/supabase/schema/message"
import { userSelectSchema } from "@/supabase/schema/user"

const YosegakiInsertSchema = z.object({}).extend({
  message: messageInsertSchema,
  image: ImageInputSchema,
})
type YosegakiInsertType = z.infer<typeof YosegakiInsertSchema>

const YosegakiSelectSchema = z.object({}).extend({
  message: messageSelectSchema,
  user: userSelectSchema,
  image: ImageOutputSchema,
})
type YosegakiSelectType = z.infer<typeof YosegakiSelectSchema>

export {
  YosegakiInsertSchema,
  type YosegakiInsertType,
  YosegakiSelectSchema,
  type YosegakiSelectType,
}
