import { eq } from "drizzle-orm"

import { getImage, upsertImage } from "@/messages/lib/image"
import { upsertMessage } from "@/messages/lib/message"
import {
  YosegakiInsertSchema,
  YosegakiInsertType,
  YosegakiSelectSchema,
  YosegakiSelectType,
} from "@/messages/types/yosegaki"
import db from "@/supabase/db"
import { message, user } from "@/supabase/schema"
import { getFirstIndex } from "@/utils/array"
import { declareLet } from "@/utils/declareLet"

const getYosegaki = async (
  id: string,
): Promise<YosegakiSelectType | undefined> => {
  const result = await declareLet(async () => {
    try {
      const res = await db
        .select()
        .from(user)
        .where(eq(user.id, id))
        .leftJoin(message, eq(user.id, message.id))
      return getFirstIndex(res)
    } catch (error) {
      console.log(error)
      return undefined
    }
  })

  // invalid user id
  if (result == undefined || result.user == undefined) {
    return undefined
  }

  // no message yet
  if (result.message == undefined) {
    return {
      user: result.user,
    }
  }

  if (result.message.file_name == null || result.message.file_name == "") {
    const val = YosegakiSelectSchema.safeParse({
      ...result,
      image: undefined,
    })
    if (!val.success) {
      console.log(val.error)
      return undefined
    }
    return val.data
  }

  const image = await getImage(id, result.message.file_name)

  const val = YosegakiSelectSchema.safeParse({
    ...result,
    image,
  })
  if (!val.success) {
    console.log(val.error)
    return undefined
  }
  return val.data
}

const upsertYosegaki = async (yosegaki: YosegakiInsertType) => {
  const val = YosegakiInsertSchema.safeParse(yosegaki)
  if (!val.success) {
    console.log(val.error)
    return
  }
  const { image, message } = val.data

  await upsertMessage(message)
  if (image != null) {
    await upsertImage(image, message.id)
  }
}

export { getYosegaki, upsertYosegaki }
