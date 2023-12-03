import { eq } from "drizzle-orm"

import db from "@/supabase/db"
import { message, user } from "@/supabase/schema"
import type { messageInsertType } from "@/supabase/schema/message"
import { declareLet } from "@/utils/declareLet"

const getMessage = async (id: string) => {
  const result = await declareLet(async () => {
    try {
      return await db
        .select()
        .from(message)
        .where(eq(message.id, id))
        .innerJoin(user, eq(message.id, user.id))
    } catch (error) {
      console.log(error)
      return []
    }
  })
  return result?.[0]
}

const getAllMessages = async () => {
  const result = await declareLet(async () => {
    try {
      return await db
        .select()
        .from(message)
        .where(eq(message.accepted, true))
        .innerJoin(user, eq(message.id, user.id))
    } catch (error) {
      console.log(error)
      return []
    }
  })
  console.log(result)
  return result
}

const upsertMessage = async (messageValue: messageInsertType) => {
  try {
    await db
      .insert(message)
      .values(messageValue)
      .onConflictDoUpdate({
        target: message.id,
        set: {
          content: messageValue.content,
          file_name: messageValue.file_name,
          accepted: messageValue.accepted,
        },
      })
  } catch (error) {
    console.log(error)
  }
}

const deleteMessage = async (id: string) => {
  const deletedId = await declareLet(async () => {
    try {
      return await db
        .delete(message)
        .where(eq(message.id, id))
        .returning({ id: message.id })
    } catch (error) {
      console.log(error)
      return []
    }
  })
  return deletedId?.[0]
}

export { deleteMessage, getAllMessages, getMessage, upsertMessage }
