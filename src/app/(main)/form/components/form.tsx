"use client"

import { useId, useRef, useState } from "react"
import { useFormState } from "react-dom"

import ImagePreview from "@/app/(main)/form/components/imagePreview"
import { submitAction } from "@/app/(main)/form/lib/formAction"
import type { FormState, Message } from "@/app/(main)/form/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormProps = {
  initialMessage: Message
}

const MessageForm = ({ initialMessage }: FormProps) => {
  const initialState: FormState = {
    value: initialMessage,
    error: {},
    message: "",
  }
  const [state, dispatch] = useFormState(submitAction, initialState)
  const [image, setImage] = useState<File | null>(null)

  const titleId = useId()
  const contentId = useId()
  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  const fileId = useId()

  return (
    <div className="flex flex-col flex-nowrap gap-y-8">
      <form
        action={(e) => {
          const entries = e.entries()
          // log entries
          for (const entry of entries) {
            console.log(entry)
          }
          dispatch(e)
        }}
        className="flex flex-col gap-y-4"
      >
        {state.message && (
          <p className="text-red-500 dark:text-red-900">{state.message}</p>
        )}
        <div>
          <Label htmlFor={titleId}>寄せ書きタイトル</Label>
          <Input
            defaultValue={state.value?.title}
            id={titleId}
            name="title"
            type="text"
          />
          {state.error?.title && (
            <p className="text-red-500 dark:text-red-900">
              {state.error.title}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={contentId}>寄せ書き本文</Label>
          <Textarea
            className="resize-none"
            defaultValue={state.value?.content}
            id={contentId}
            name="content"
            onChange={(e) => {
              const scrollHeight = e.target.scrollHeight
              contentRef.current?.style.setProperty(
                "height",
                `${scrollHeight}px`,
              )
            }}
            ref={contentRef}
          />
          {state.error?.content && (
            <p className="text-red-500 dark:text-red-900">
              {state.error.content}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={fileId}>添付ファイル</Label>
          <Input
            accept="image/*"
            id={fileId}
            name="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImage(file)
              }
            }}
            type="file"
          />
          {state.error?.file && (
            <p className="text-red-500 dark:text-red-900">{state.error.file}</p>
          )}
        </div>
        <Button type="submit">送信</Button>
      </form>
      <ImagePreview file={image} />
    </div>
  )
}

export default MessageForm
