"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
const SubmitButton = ({ children }: { children?: React.ReactNode }) => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

export default SubmitButton
