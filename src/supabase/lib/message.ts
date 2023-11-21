import type { Session } from "@supabase/supabase-js"
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { z } from "zod"

import {
  DownloadedMessage,
  DownloadedMessageSchema,
  FileWithUrl,
  MessageSchema,
} from "@/messages/types"
import { createClient as createAdminClient } from "@/supabase/utils/adminClient"
import { createClient } from "@/supabase/utils/serverClient"
import { asyncFlatMap } from "@/utils/array"

export const getMessage = async (
  cookies: ReadonlyRequestCookies,
  session: Session,
): Promise<DownloadedMessage | undefined> => {
  const supabase = createClient(cookies)
  const uid = session.user.id

  const { data: message, error } = await supabase
    .from("message")
    .select("*")
    .eq("uid", uid)
    .single()
  if (error != null)
    return {
      content: "エラーが発生しました。",
      user: {
        avatar_url: session.user.user_metadata.avatar_url,
        id: session.user.id,
        name: session.user.user_metadata.user_name,
      },
    }

  let userFile: FileWithUrl | undefined
  if (message.file_name) {
    const filePath = `${session.user.id}/${message.file_name}`
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage.from("images").createSignedUrl(filePath, 4000)
    userFile = signedUrlError
      ? undefined
      : {
          name: message.file_name,
          url: signedUrlData.signedUrl,
        }
  } else {
    userFile = undefined
  }

  return {
    content: message.content,
    user: {
      id: session.user.id,
      avatar_url: session.user.user_metadata.avatar_url,
      name: session.user.user_metadata.user_name,
    },
    file: userFile,
  }
}

export const getAllAcceptedMessages = async (): Promise<
  DownloadedMessage[]
> => {
  const supabase = createAdminClient()
  const {
    data: { users },
    error: userError,
  } = await supabase.auth.admin.listUsers({ perPage: 1000 })

  if (userError) throw userError

  const { data: allAcceptedMessages, error } = await supabase
    .from("message")
    .select("*")
    .eq("accepted", true)
  if (error) throw error

  // match with user data
  const messageWithUserMap = await asyncFlatMap(
    allAcceptedMessages,
    async (message) => {
      const user = users.find((user) => user.id === message.uid)
      if (!user) return []

      let userFile: FileWithUrl | undefined
      if (message.file_name) {
        const filePath = `${user.id}/${message.file_name}`
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage.from("images").createSignedUrl(filePath, 4000)
        userFile = signedUrlError
          ? undefined
          : {
              name: message.file_name,
              url: signedUrlData.signedUrl,
            }
      } else {
        userFile = undefined
      }

      const validated = await DownloadedMessageSchema.safeParseAsync({
        content: message.content,
        // get files from storage
        file: userFile,
        user: {
          id: user.id,
          name: user.user_metadata.name,
          avatar_url: user.user_metadata.avatar_url,
        },
      })
      return validated.success ? [validated.data] : []
    },
  )

  return messageWithUserMap
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
