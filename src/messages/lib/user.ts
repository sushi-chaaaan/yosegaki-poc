import { eq } from "drizzle-orm"

import db from "@/supabase/db"
import { user, userInsertSchema, userInsertType } from "@/supabase/schema/user"
import { getFirstIndex } from "@/utils/array"
import { declareLet } from "@/utils/declareLet"

const upsertUser = async (userValue: userInsertType) => {
  const validated = userInsertSchema.safeParse(userValue)

  if (!validated.success) {
    console.log(validated.error)
    return
  }

  try {
    await db
      .insert(user)
      .values(validated.data)
      .onConflictDoUpdate({
        target: user.id,
        set: {
          name: userValue.name,
          display_name: userValue.display_name,
          avatar_url: userValue.avatar_url,
        },
      })
  } catch (error) {
    console.log(error)
  }
}

const getUser = async (id: string) => {
  const result = await declareLet(async () => {
    try {
      return await db.select().from(user).where(eq(user.id, id))
    } catch (error) {
      console.log(error)
      return []
    }
  })
  return getFirstIndex(result)
}

export { getUser, upsertUser }
