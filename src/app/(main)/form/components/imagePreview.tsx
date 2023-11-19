import Image from "next/image"

type Props = {
  file?: File | null
}

const ImagePreview = ({ file }: Props) => {
  return (
    <div className="relative aspect-square w-full rounded-lg">
      {file && (
        <Image
          alt="preview"
          className="object-contain"
          fill
          src={URL.createObjectURL(file)}
        />
      )}
    </div>
  )
}

export default ImagePreview
