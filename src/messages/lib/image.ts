import { cookies } from "next/headers"

import { ImageOutputSchema, type ImageOutputType } from "@/messages/types/image"
import { createClient } from "@/supabase/utils/serverClient"

const IMAGE_BUCKET = "images"

const getFilePath = (id: string, fileName: string) => `${id}/${fileName}`

const upsertImage = async (file: File, id: string) => {
  const supabase = createClient(cookies())
  const filePath = getFilePath(id, file.name)

  await supabase.storage.from(IMAGE_BUCKET).upload(filePath, file, {
    upsert: true,
  })
}

const getImage = async (
  id: string,
  fileName: string,
): Promise<ImageOutputType | undefined> => {
  const supabase = createClient(cookies())
  const filePath = getFilePath(id, fileName)

  const { data: signedUrlData } = await supabase.storage
    .from(IMAGE_BUCKET)
    .createSignedUrl(filePath, 4000)

  const result = ImageOutputSchema.safeParse({
    name: fileName,
    url: signedUrlData?.signedUrl,
  })

  if (!result.success) {
    console.log(result.error)
    return undefined
  }
  return result.data
}

export { getImage, upsertImage }
