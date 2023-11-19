import Link from "next/link"

import MaxWidth from "@/components/layout/maxWidth"

export default function Home() {
  return (
    <MaxWidth type="content">
      <div className=" text-center">
        <h1>棗いつき誕生日記念寄せ書き</h1>
        <Link href="/form">message form page</Link>
      </div>
    </MaxWidth>
  )
}
