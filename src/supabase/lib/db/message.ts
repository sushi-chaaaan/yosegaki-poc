import { eq } from "drizzle-orm"

import db from "@/supabase/db"
import { message, user } from "@/supabase/schema"

const getAllMessages = async () => {
  const query = await db
    .select()
    .from(message)
    .where(eq(message.accepted, true))
    .innerJoin(user, eq(message.id, user.id))

  console.log(query)
}

getAllMessages()
