import Link from "next/link"

// import AllMessages from "@/app/(top)/components/allMessages"
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
      {/* <MaxWidth
        asChild
        center
        className="flex flex-col flex-nowrap"
        type="full"
      >
        <div className="prose text-center">
          <h2>寄せ書き一覧</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 ">
            <AllMessages />
          </div>
        </div>
      </MaxWidth> */}
    </div>
  )
}
