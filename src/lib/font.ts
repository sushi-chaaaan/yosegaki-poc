import { Noto_Sans_JP, Roboto, Zen_Kurenaido } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

const roboto = Roboto({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const zenKurenaido = Zen_Kurenaido({
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-zen-kurenaido",
})

export const fontVariables = [notoSansJP, roboto]
  .map((font) => font.variable)
  .join(" ")

export { notoSansJP, roboto, zenKurenaido }
