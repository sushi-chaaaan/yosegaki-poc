import { cookies } from "next/headers"

import { ImageOutputSchema, type ImageOutputType } from "@/messages/types/image"
import { createClient as createAdminClient } from "@/supabase/utils/adminClient"
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

type ImageInfo = {
  id: string
  fileName: string
}

const getImage = async ({
  id,
  fileName,
}: ImageInfo): Promise<ImageOutputType | undefined> => {
  const supabase = createClient(cookies())
  const filePath = getFilePath(id, fileName)

  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .createSignedUrl(filePath, 4000)

  if (error || data == null) {
    console.log(error)
    return undefined
  }

  const result = ImageOutputSchema.safeParse({
    name: fileName,
    url: data.signedUrl,
  })

  if (!result.success) {
    console.log(result.error)
    return undefined
  }
  return result.data
}

type ImageOutputObject = {
  id: string
  image: ImageOutputType
}

const getImages = async (
  imageInfos: ImageInfo[],
): Promise<ImageOutputObject[] | undefined> => {
  const supabase = createAdminClient()

  const images = await supabase.storage.from(IMAGE_BUCKET).createSignedUrls(
    imageInfos.map(({ id, fileName }) => getFilePath(id, fileName)),
    4000,
  )

  if (images.error || images.data == null) {
    console.log(images.error)
    return undefined
  }

  const rawResult = images.data.map((image) => {
    if (image.error || image.path == null) {
      console.log(image.error)
      return undefined
    }

    const id = image.path.split("/")[0]
    const fileName = image.path.split("/")[1]

    const result = ImageOutputSchema.safeParse({
      name: fileName,
      url: image.signedUrl,
    })

    if (!result.success) {
      console.log(result.error)
      return undefined
    }

    return {
      id: id,
      image: result.data,
    }
  })

  return rawResult.filter(
    (result): result is ImageOutputObject => result != undefined,
  )
}

export { getImage, getImages, upsertImage }
