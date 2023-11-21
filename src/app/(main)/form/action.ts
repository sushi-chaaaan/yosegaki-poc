"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

import type { FormState } from "@/app/(main)/form/types"
import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import { MessageSchema } from "@/messages/types"
import { deleteMessage, upSertMessage } from "@/supabase/lib/message"

export const submitAction = async (
  state: FormState,
  data: FormData,
): Promise<FormState> => {
  const cookieStore = cookies()
  const rawContent = data.get("content")
  const rawFile = data.get("file")

  const validatedMessage = MessageSchema.safeParse({
    content: rawContent,
    file: rawFile,
  })

  if (!validatedMessage.success) {
    return {
      value: {
        content: rawContent?.toString() ?? "",
        file: undefined,
      },
      message: "",
      error: validatedMessage.error.flatten().fieldErrors,
    }
  }
  await upSertMessage(cookieStore, validatedMessage.data)
  revalidateTag(ACCEPTED_MESSAGES_CACHE_TAG)

  return {
    value: {
      content: validatedMessage.data.content,
      file: undefined,
    },
    message: "送信しました。",
    error: {},
  }
}

export const deleteAction = async () => {
  const cookieStore = cookies()
  await deleteMessage(cookieStore)
}
