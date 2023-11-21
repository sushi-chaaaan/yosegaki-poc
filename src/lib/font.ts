import { Noto_Sans_JP, Roboto } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

const roboto = Roboto({
  display: "swap",
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const fontVariables = [notoSansJP, roboto]
  .map((font) => font.variable)
  .join(" ")

export { notoSansJP, roboto }
