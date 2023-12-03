"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { useEffect, useId, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { formAction } from "@/app/(main)/form/action"
import SubmitButton from "@/app/(main)/form/components/submitButton"
import type { FormState } from "@/app/(main)/form/types"
import MessageCard from "@/components/messageCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ImageOutputType } from "@/messages/types/image"
import { YosegakiSelectType } from "@/messages/types/yosegaki"
import { fileIsImage } from "@/utils/file"

type FormProps = {
  initialYosegaki: YosegakiSelectType
}

const MessageForm = ({ initialYosegaki }: FormProps) => {
  const contentId = useId()
  const imageId = useId()

  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  const [textLength, setTextLength] = useState(
    initialYosegaki.message?.content?.length ?? 0,
  )
  const adjustTextareaHeight = () => {
    const ref = contentRef.current
    if (!ref) return
    const scrollHeight = ref.scrollHeight
    ref.style.setProperty("height", `${scrollHeight}px`)
  }
  useEffect(() => {
    const ref = contentRef.current
    adjustTextareaHeight()
    return () => {
      ref?.style.removeProperty("height")
    }
  }, [])
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight()
    setTextLength(e.target.value.length)
  }

  const [image, setImage] = useState<ImageOutputType | undefined>(
    initialYosegaki.image,
  )
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && fileIsImage(file)) {
      setImage({
        name: file.name,
        url: URL.createObjectURL(file),
      })
    }
  }

  const initialState: FormState = {
    initialValue: initialYosegaki,
    value: {
      content: initialYosegaki.message?.content ?? "",
      image: undefined,
    },
    error: {},
  }

  const [state, dispatch] = useFormState(formAction, initialState)
  const [isDeleting, setIsDeleting] = useState(false)
  const handleSubmitAction = async (e: FormData) => {
    // upload image here
    setIsDeleting(false)
    dispatch(e)
  }

  const resetForm = () => {
    setTextLength(0)
    setImage(undefined)
    if (formRef.current) formRef.current.reset()
    if (contentRef.current) {
      contentRef.current.value = ""
      contentRef.current.style.removeProperty("height")
    }
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  const { toast } = useToast()
  const handleDeleteAction = async (e: FormData) => {
    setIsDeleting(true)
    e.set("mode", "delete")
    dispatch(e)
    setIsDeleting(false)
    resetForm()
    const { dismiss } = toast({
      description: "寄せ書きを削除しました。",
      variant: "default",
    })
    setTimeout(() => {
      dismiss()
    }, 3000)
  }

  return (
    <div className="flex flex-col flex-nowrap gap-y-8">
      <form className="flex flex-col gap-y-4" ref={formRef}>
        <div>
          <Label htmlFor={contentId}>
            寄せ書き本文(必須, 現在 {textLength} / 2000 文字)
          </Label>
          <Textarea
            className="resize-none"
            defaultValue={state.value?.content}
            id={contentId}
            name="content"
            onChange={handleTextChange}
            placeholder="寄せ書き本文"
            ref={contentRef}
          />
          <p
            aria-hidden={
              state.error.content == undefined ||
              state.error.content.length === 0
            }
            className="min-h-[1.8rem] text-red-500 dark:text-red-900"
          >
            {state.error.content}
          </p>
        </div>
        <div>
          <Label htmlFor={imageId}>添付ファイル(画像のみ)</Label>
          <Input
            accept="image/*"
            id={imageId}
            name="image"
            onChange={handleImageChange}
            type="file"
          />
          <p
            aria-hidden={
              state.error.image == undefined || state.error.image.length === 0
            }
            className="min-h-[1.8rem] text-red-500 dark:text-red-900"
          >
            {state.error.image}
          </p>
        </div>
        <p
          aria-hidden={state.message == null}
          className={clsx({
            "font-bold min-h-[1.8rem]": true,
            "text-green-500 dark:text-green-900":
              state.message?.type === "success",
            "text-red-500 dark:text-red-900": state.message?.type === "error",
          })}
        >
          {state.message?.content}
        </p>
        <SubmitButton formAction={handleSubmitAction}>投稿</SubmitButton>
        <Button
          disabled={initialYosegaki.message == null || isDeleting}
          formAction={handleDeleteAction}
          type="submit"
          variant="destructive"
        >
          {isDeleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          寄せ書きを削除する
        </Button>
      </form>

      <MessageCard
        priorityLoading
        yosegaki={{
          message: initialYosegaki.message,
          user: initialYosegaki.user,
          image: image,
        }}
      />
    </div>
  )
}

export default MessageForm
