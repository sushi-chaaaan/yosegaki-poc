import Link from "next/link"

// import AllMessages from "@/app/(index)/components/allMessages"
import MaxWidth from "@/components/layout/maxWidth"

export default function Home() {
  return (
    <div className="px-2">
      <MaxWidth asChild type="content">
        <div className="prose text-center">
          <h1>棗いつき誕生日記念寄せ書き</h1>
          <Link href="/join">寄せ書きを送る</Link>
        </div>
      </MaxWidth>
      <MaxWidth
        asChild
        center
        className="flex flex-col flex-nowrap"
        type="content"
      >
        <div>
          <h2 className="text-center">寄せ書き一覧</h2>
          {/* <AllMessages /> */}
          <div>Coming Soon</div>
        </div>
      </MaxWidth>
    </div>
  )
}

export const revalidate = 3600
