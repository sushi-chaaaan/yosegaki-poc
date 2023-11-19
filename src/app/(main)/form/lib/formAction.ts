"use server"

import { cookies } from "next/headers"

import { type FormState, MessageSchema } from "@/app/(main)/form/types"
import { upSertMessage } from "@/lib/message"

export const submitAction = async (
  state: FormState,
  data: FormData,
): Promise<FormState> => {
  const cookieStore = cookies()

  const rawTitle = data.get("title")
  const rawContent = data.get("content")
  const rawFile = data.get("file")

  const validatedMessage = MessageSchema.safeParse({
    title: rawTitle,
    content: rawContent,
    file: rawFile,
  })

  if (!validatedMessage.success) {
    return {
      value: {
        title: rawTitle?.toString() ?? "",
        content: rawContent?.toString() ?? "",
        file: undefined,
      },
      message: "入力内容に誤りがあります。",
      error: validatedMessage.error.flatten().fieldErrors,
    }
  }
  await upSertMessage(cookieStore, validatedMessage.data)

  return {
    value: {
      title: validatedMessage.data.title,
      content: validatedMessage.data.content,
      file: undefined,
    },
    message: "送信しました。",
    error: {},
  }
}
