import { Slot } from "@radix-ui/react-slot"
import { tv, VariantProps } from "tailwind-variants"

import type { PropsWithAsChild } from "@/types/asChild"

const MaxWidthVariants = tv({
  variants: {
    type: {
      content: "max-w-[960px]",
      full: "max-w-full",
    },
    center: {
      true: "mx-auto",
    },
  },
  defaultVariants: {
    type: "content",
    center: true,
  },
})

type MaxWidthProps = VariantProps<typeof MaxWidthVariants>

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
export default function MaxWidth({
  children,
  asChild,
  type,
  center,
  className,
  ...props
}: Props) {
  asChild ??= false
  const Component = asChild ? Slot : "div"

  return (
    <Component
      className={MaxWidthVariants({ type, center, className })}
      {...props}
    >
      {children}
    </Component>
  )
}
