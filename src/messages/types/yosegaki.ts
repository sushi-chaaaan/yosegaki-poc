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
  message: messageSelectSchema.optional(),
  user: userSelectSchema,
  image: ImageOutputSchema.optional(),
})
type YosegakiSelectType = z.infer<typeof YosegakiSelectSchema>

const YosegakiInputSchema = z
  .object({})
  .merge(messageInsertSchema.pick({ content: true }))
  .extend({
    image: ImageInputSchema,
  })
type YosegakiInputType = z.infer<typeof YosegakiInputSchema>

export {
  YosegakiInputSchema,
  type YosegakiInputType,
  YosegakiInsertSchema,
  type YosegakiInsertType,
  YosegakiSelectSchema,
  type YosegakiSelectType,
}
