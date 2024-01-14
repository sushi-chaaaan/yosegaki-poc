import FormButton from "@/app/(main)/join/components/FormButton"
import MaxWidth from "@/components/layout/maxWidth"

export default async function Page() {
  return (
    <MaxWidth asChild center type="content">
      <div className="prose flex flex-col flex-nowrap gap-y-4 text-center">
        <h1>....誕生日記念寄せ書き企画</h1>
        <span>....さんの誕生日をお祝いする寄せ書きを贈りませんか？</span>
        <FormButton />
      </div>
    </MaxWidth>
  )
}
