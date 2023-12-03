import { z } from "zod"

import { fileIsEmpty, fileIsImage } from "@/utils/file"

const ImageInputSchema = z
  .custom<File | undefined>()
  .optional()
  .refine(
    (value) => value == null || fileIsEmpty(value) || fileIsImage(value),
    {
      message: "画像ファイルを選択してください。",
    },
  )
  .transform((value) => {
    if (value == null || fileIsEmpty(value) || !fileIsImage(value))
      return undefined
    return value
  })

type ImageInputType = z.infer<typeof ImageInputSchema>

const ImageOutputSchema = z
  .object({
    name: z.string(),
    url: z.string().url(),
  })

type ImageOutputType = z.infer<typeof ImageOutputSchema>

export {
  ImageInputSchema,
  type ImageInputType,
  ImageOutputSchema,
  type ImageOutputType,
}
