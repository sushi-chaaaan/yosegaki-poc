"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import React from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
type Props = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "type" | "children"
> & {
  children: React.ReactNode
  type?: "submit"
}
const SubmitButton = ({
  children,
  type = "submit",
  disabled,
  ...rest
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending || disabled} type={type} {...rest}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

export default SubmitButton
