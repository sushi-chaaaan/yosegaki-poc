import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { z } from "zod"

import { type Message, MessageSchema } from "@/app/(main)/form/types"
import { createClient as createAdminClient } from "@/supabase/utils/adminClient"
import { createClient } from "@/supabase/utils/serverClient"
import { asyncFlatMap } from "@/utils/array"

export const getMessage = async (
  cookies: ReadonlyRequestCookies,
): Promise<Message | undefined> => {
  const supabase = createClient(cookies)
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError || sessionData.session == null) {
    console.error(sessionError)
    return undefined
  }
  const uid = sessionData.session.user.id

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

  return { content: data.content }
}

export const getAllMessages = async (): Promise<Message[]> => {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("message").select("*")
  if (error) throw error

  return await asyncFlatMap(data, async (message) => {
    const validated = await MessageSchema.safeParseAsync({
      content: message.content,
      file: undefined,
    })
    return validated.success ? [validated.data] : []
  })
}

export const getAllAcceptedMessages = async (): Promise<Message[]> => {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("message")
    .select("*")
    .eq("accepted", true)
  if (error) throw error

  return await asyncFlatMap(data, async (message) => {
    const validated = await MessageSchema.safeParseAsync({
      content: message.content,
      file: undefined,
    })
    return validated.success ? [validated.data] : []
  })
}

export const upSertMessage = async (
  cookies: ReadonlyRequestCookies,
  body: z.infer<typeof MessageSchema>,
) => {
  const supabase = createClient(cookies)
  const sessionRes = await supabase.auth.getSession()
  if (sessionRes.error || sessionRes.data.session == null)
    throw sessionRes.error

  const uid = sessionRes.data.session.user.id

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
  const sessionRes = await supabase.auth.getSession()
  if (sessionRes.error || sessionRes.data.session == null)
    throw sessionRes.error

  const uid = sessionRes.data.session.user.id

  const { error } = await supabase.from("message").delete().eq("uid", uid)
  if (error) throw error

  // delete file
}
