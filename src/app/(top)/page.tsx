import Link from "next/link"

export default function Home() {
  return (
    <div className="prose prose-zinc">
      <h1>棗いつき誕生日記念寄せ書き</h1>
      <Link href="/form">message form page</Link>
    </div>
  )
}
