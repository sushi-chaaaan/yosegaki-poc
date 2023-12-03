import { declareLet } from "@/utils/declareLet"

type Props = {
  error?: string | string[] | Error | null | undefined
}

const FieldError = ({ error }: Props) => {
  const { content, ariaHidden } = declareLet(() => {
    if (error == null) return { content: "", ariaHidden: true }
    if (typeof error === "string") return { content: error, ariaHidden: false }
    if (Array.isArray(error)) {
      if (error.length === 0) return { content: "", ariaHidden: true }
      return { content: error.join(" "), ariaHidden: false }
    }
    if (error instanceof Error) {
      return { content: error.message, ariaHidden: false }
    }
    return { content: "", ariaHidden: true }
  })

  return (
    <p
      aria-hidden={ariaHidden}
      aria-live="polite"
      className="min-h-[1rem] text-xs text-red-500 dark:text-red-900"
    >
      {content}
    </p>
  )
}

export default FieldError
