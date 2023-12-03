import { eq } from "drizzle-orm"

import { getImage, getImages, upsertImage } from "@/messages/lib/image"
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

  const image = await getImage({
    id: result.message.id,
    fileName: result.message.file_name,
  })

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

type YosegakiWithImage = {
  message: {
    id: string
    content: string
    file_name: string
    accepted: boolean
  }
  user: {
    id: string
    name: string
    display_name: string
    avatar_url: string | null
  }
}

const getAllValidYosegaki = async (): Promise<YosegakiSelectType[]> => {
  const result = await declareLet(async () => {
    try {
      // TODO: add accepted condition
      const res = await db
        .select()
        .from(message)
        .innerJoin(user, eq(message.id, user.id))
      return res
    } catch (error) {
      console.log(error)
      return undefined
    }
  })

  if (result == undefined) {
    return []
  }

  const messageImageInfos = result
    .filter(
      (res): res is YosegakiWithImage =>
        res.message.file_name != null && res.message.file_name != "",
    )
    .map(({ message }) => ({
      id: message.id,
      fileName: message.file_name,
    }))

  const images =
    messageImageInfos.length > 0
      ? await getImages(messageImageInfos)
      : undefined

  const yosegaki = result.map((res) => {
    const image = images?.find((image) => image.id == res.message.id)
    const val = YosegakiSelectSchema.safeParse({
      ...res,
      image: image ? image.image : undefined,
    })
    if (!val.success) {
      console.log(val.error)
      return undefined
    }
    return val.data
  })
  return yosegaki.filter((y): y is YosegakiSelectType => y != undefined)
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

export { getAllValidYosegaki, getYosegaki, upsertYosegaki }
