"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useId, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { deleteAction, submitAction } from "@/app/(main)/form/action"
import ImagePreview from "@/app/(main)/form/components/imagePreview"
import type { FormState, Message } from "@/app/(main)/form/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLocation } from "@/hooks/useLocation"

type FormProps = {
  initialMessage: Message
}

const MessageForm = ({ initialMessage }: FormProps) => {
  const contentId = useId()
  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  const fileId = useId()
  const { toast } = useToast()

  const initialState: FormState = {
    value: initialMessage,
    error: {},
    message: "",
  }
  const [state, dispatch] = useFormState(submitAction, initialState)
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  const runSubmitAction = async (e: FormData) => {
    setIsLoading(true)
    dispatch(e)
    setIsLoading(false)
  }

  const runDeleteAction = async () => {
    setIsLoading(true)
    await deleteAction()
    setIsLoading(false)
    toast({
      description: "寄せ書きを削除しました。",
      variant: "default",
    })
    setTimeout(() => {
      location?.reload()
    }, 1000)
  }

  return (
    <div className="flex flex-col flex-nowrap gap-y-8">
      <form className="flex flex-col gap-y-4">
        {state.message && (
          <p className="font-bold text-green-500 dark:text-green-900">
            {state.message}
          </p>
        )}
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
        <Button formAction={runSubmitAction} type="submit">
          送信
        </Button>
        <Button
          disabled={isLoading}
          onClick={runDeleteAction}
          type="button"
          variant="destructive"
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          寄せ書きを削除する
        </Button>
      </form>

      <ImagePreview file={image} />
    </div>
  )
}

export default MessageForm