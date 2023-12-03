"use server"

import { revalidateTag } from "next/cache"

import type { FormState } from "@/app/(main)/form/types"
import { ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import { deleteMessage } from "@/messages/lib/message"
import { upsertYosegaki } from "@/messages/lib/yosegaki"
import {
  YosegakiInputSchema,
  YosegakiInsertSchema,
} from "@/messages/types/yosegaki"
import { getServerSession } from "@/supabase/lib/session"
import { declareLet } from "@/utils/declareLet"

export const submitAction = async (
  state: FormState,
  data: FormData,
): Promise<FormState> => {
  const rawContent = data.get("content")
  const rawImage = data.get("image")

  const inputValResult = YosegakiInputSchema.safeParse({
    content: rawContent,
    image: rawImage,
  })

  if (!inputValResult.success) {
    return {
      initialValue: state.initialValue,
      value: {
        content: rawContent?.toString() ?? "",
        image: undefined,
      },
      message: {
        type: "error",
        content: "入力内容にエラーがあります。",
      },
      error: inputValResult.error.flatten().fieldErrors,
    }
  }

  const { data: sessionData, error: sessionError } = await getServerSession()

  if (sessionError || sessionData.session === null) {
    return {
      initialValue: state.initialValue,
      value: {
        content: inputValResult.data.content,
        image: undefined,
      },
      message: {
        type: "error",
        content: "セッションエラーが発生しました。",
      },
      error: {
        content: [sessionError?.message ?? "エラーが発生しました。"],
      },
    }
  }

  // keep the original file name if the user does not change the image
  const fileName = declareLet(() => {
    if (inputValResult.data.image == null) {
      return state.initialValue.image?.name
    }
    return inputValResult.data.image.name
  })

  const insertYosegakiValResult = YosegakiInsertSchema.safeParse({
    message: {
      id: sessionData.session.user.id,
      content: inputValResult.data.content,
      file_name: fileName,
      accepted: false,
    },
    image: inputValResult.data.image,
    user: sessionData.session.user,
  })

  if (!insertYosegakiValResult.success) {
    console.error(insertYosegakiValResult.error)
    return {
      initialValue: state.initialValue,
      value: {
        content: inputValResult.data.content,
        image: undefined,
      },
      message: {
        type: "error",
        content: "データエラーが発生しました。",
      },
      error: insertYosegakiValResult.error.flatten().fieldErrors,
    }
  }
  await upsertYosegaki(insertYosegakiValResult.data)
  revalidateTag(ACCEPTED_MESSAGES_CACHE_TAG)

  return {
    initialValue: state.initialValue,
    value: {
      content: insertYosegakiValResult.data.message.content,
      image: undefined,
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
