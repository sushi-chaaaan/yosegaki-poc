"use server"

import { FormValue, MessageSchema } from "@/app/(main)/form/message"

export type FormState = {
  value: FormValue | undefined
  error: {
    [K in keyof FormValue]?: string[]
  }
  message?: string
}

export const submitAction = async (
  state: FormState,
  data: FormData,
): Promise<FormState> => {
  const rawTitle = data.get("title")
  const rawContent = data.get("content")
  const rawFile = data.get("file")

  const validatedMessage = MessageSchema.safeParse({
    title: rawTitle,
    content: rawContent,
    file: rawFile,
  })

  console.log(JSON.stringify(state, null, 2))

  if (!validatedMessage.success) {
    return {
      value: {
        title: rawTitle?.toString() ?? "",
        content: rawContent?.toString() ?? "",
        file: rawFile?.toString(),
      },
      message: "入力内容に誤りがあります。",
      error: validatedMessage.error.flatten().fieldErrors,
    }
  }

  console.log(JSON.stringify(validatedMessage, null, 2))

  return {
    value: {
      title: validatedMessage.data.title,
      content: validatedMessage.data.content,
      file: validatedMessage.data.file?.toString(),
    },
    message: "送信しました。",
    error: {},
  }
}
