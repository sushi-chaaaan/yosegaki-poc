import SignInButton from "@/components/supabase/signInButton"

export default async function Page() {
  return (
    <div className="prose mx-auto">
      <h1>棗いつき誕生日記念寄せ書き企画</h1>
      <span>棗いつきさんの誕生日をお祝いする寄せ書きを贈りませんか？</span>
      <SignInButton redirectTo="/form">
        <span>フォームへ(要Twitterアカウント)</span>
      </SignInButton>
    </div>
  )
}
