import { Slot } from "@radix-ui/react-slot"
import { clsx } from "clsx"

import type { PropsWithAsChild } from "@/types/asChild"

type MaxWidthProps = {
  children: React.ReactNode
  type: "content" | "full"
}

type Props = PropsWithAsChild<MaxWidthProps, "div">

/**
 * Utility component to set max-width on content or full page.
 *
 * if asChild is true, it will render as Slot component.(直下の子要素にclassを注入します)
 *
 * otherwise, it will render as div component.(新しいdiv要素を追加するふるまいをします)
 *
 * @export
 * @param {Props}
 */
export default function MaxWidth({ children, asChild, type }: Props) {
  asChild ??= false
  const Component = asChild ? Slot : "div"

  return (
    <Component
      className={clsx({
        "max-w-[960px] mx-auto": type === "content",
        "max-w-full": type === "full",
      })}
    >
      {children}
    </Component>
  )
}
