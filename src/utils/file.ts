const fileIsEmpty = (file: File) => {
  return (
    file != null && file.size === 0 && file.type === "application/octet-stream"
  )
}

const fileIsImage = (file: File) => {
  return file != null && file.type.startsWith("image/")
}

export { fileIsEmpty, fileIsImage }
