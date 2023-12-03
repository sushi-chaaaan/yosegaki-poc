"use client"

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
const DeleteButton = ({
  children,
  type = "submit",
  disabled,
  ...rest
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type={type}
      variant="destructive"
      {...rest}
    >
      {children}
    </Button>
  )
}

export default DeleteButton
