"use server"

import { revalidateTag } from "next/cache"

import type { FormState } from "@/app/(main)/form/types"
import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import { MessageImageSchema } from "@/messages/types"
import { deleteMessage, upsertMessage } from "@/supabase/lib/db/message"
import { getServerSession } from "@/supabase/lib/session"
import { messageInsertSchema } from "@/supabase/schema/message"

export const submitAction = async (
  state: FormState,
  data: FormData,
): Promise<FormState> => {
  const rawContent = data.get("content")
  const rawFile = data.get("file")

  const InputSchema = messageInsertSchema
    .pick({
      content: true,
    })
    .extend({
      file: MessageImageSchema,
    })

  const inputValResult = InputSchema.safeParse({
    content: rawContent,
    file: rawFile,
  })

  if (!inputValResult.success) {
    return {
      value: {
        content: rawContent?.toString() ?? "",
        file: undefined,
      },
      message: {
        type: "error",
        content: "エラーが発生しました。",
      },
      error: inputValResult.error.flatten().fieldErrors,
    }
  }

  const { data: sessionData, error: sessionError } = await getServerSession()

  if (sessionError || sessionData.session === null) {
    return {
      value: {
        content: inputValResult.data.content,
        file: undefined,
      },
      message: {
        type: "error",
        content: "エラーが発生しました。",
      },
      error: {
        content: [sessionError?.message ?? "エラーが発生しました。"],
      },
    }
  }

  const insertMessageValResult = messageInsertSchema.safeParse({
    id: sessionData.session.user.id,
    content: inputValResult.data.content,
    file_name: inputValResult.data.file?.name ?? "",
    accepted: false,
  })

  if (!insertMessageValResult.success) {
    return {
      value: {
        content: inputValResult.data.content,
        file: undefined,
      },
      message: {
        type: "error",
        content: "エラーが発生しました。",
      },
      error: insertMessageValResult.error.flatten().fieldErrors,
    }
  }

  await upsertMessage(insertMessageValResult.data)
  revalidateTag(ACCEPTED_MESSAGES_CACHE_TAG)

  return {
    value: {
      content: insertMessageValResult.data.content,
      file: undefined,
    },
    message: {
      type: "success",
      content:
        "寄せ書きを送信しました。一覧への反映には時間がかかる場合があります。",
    },
    error: {},
  }
}

export const deleteAction = async () => {
  const { data, error } = await getServerSession()

  if (error || data.session === null) {
    console.log(error ?? "session is null")
    return
  }

  await deleteMessage(data.session.user.id)
}
