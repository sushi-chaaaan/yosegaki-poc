"use server"

import { mkdir, writeFile } from "fs/promises"

import { type FormState, MessageSchema } from "@/app/(main)/form/types"

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

  // save Message to DB
  const { title, content, file } = validatedMessage.data

  // replace with DB
  await mkdir(`./data/${title}`, { recursive: true })
  await writeFile(`./data/${title}/title.txt`, title)
  await writeFile(`./data/${title}/content.txt`, content)
  if (file instanceof Blob) {
    await writeFile(
      `./data/${title}/${file.name}`,
      Buffer.from(await file.arrayBuffer()),
    )
  }

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
