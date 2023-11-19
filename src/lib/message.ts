import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { z } from "zod"

import { type Message, MessageSchema } from "@/app/(main)/form/types"
import { createClient } from "@/utils/supabase/server"

export const getMessage = async (
  cookies: ReadonlyRequestCookies,
): Promise<Message | undefined> => {
  const supabase = createClient(cookies)
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) {
    console.error(userResponse.error)
    return undefined
  }
  const uid = userResponse.data.user.id

  const { data, error } = await supabase
    .from("message")
    .select("*")
    .eq("uid", uid)
    .single()
  if (data == null) return { content: "" }

  if (error) throw error

  // add file getter
  if (data.file_name) {
    // get file here
  }

  return { content: data?.content ?? "" }
}

export const upSertMessage = async (
  cookies: ReadonlyRequestCookies,
  body: z.infer<typeof MessageSchema>,
) => {
  const supabase = createClient(cookies)
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) throw userResponse.error

  const uid = userResponse.data.user.id

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase.from("message").upsert({
    uid: uid,
    content: body.content,
    file_name: body.file?.name,
  })

  if (!body.file) return

  const filePath = `${uid}/${body.file.name}`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: fileData, error: fileError } = await supabase.storage
    .from("images")
    .upload(filePath, body.file, {
      upsert: true,
    })
}

export const deleteMessage = async (cookies: ReadonlyRequestCookies) => {
  const supabase = createClient(cookies)
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) throw userResponse.error
  const uid = userResponse.data.user.id

  const { error } = await supabase.from("message").delete().eq("uid", uid)
  if (error) throw error

  // delete file
}
