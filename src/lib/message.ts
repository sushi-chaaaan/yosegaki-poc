import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { z } from "zod"

import { type Message, MessageSchema } from "@/app/(main)/form/types"
import { createClient } from "@/utils/supabase/server"

export const getMessage = async (
  cookies: ReadonlyRequestCookies,
): Promise<Message> => {
  const supabase = createClient(cookies)
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) throw userResponse.error
  const uid = userResponse.data.user.id

  const { data, error } = await supabase
    .from("message")
    .select("*")
    .eq("uid", uid)
    .single()
  if (error) throw error

  // add file getter

  return {
    title: data?.title ?? "",
    content: data?.content ?? "",
  }
}

export const upSertMessage = async (
  cookies: ReadonlyRequestCookies,
  body: z.infer<typeof MessageSchema>,
) => {
  const supabase = createClient(cookies)
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) throw userResponse.error

  const uid = userResponse.data.user.id

  const { data, error } = await supabase.from("message").upsert({
    uid: uid,
    title: body.title,
    content: body.content,
  })

  console.log(data, error)

  if (!body.file) return

  const filePath = `${uid}/${body.file.name}`
  const { data: fileData, error: fileError } = await supabase.storage
    .from("images")
    .upload(filePath, body.file, {
      upsert: true,
    })
  console.log(fileData, fileError)
}
