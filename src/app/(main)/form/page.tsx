import FormWrapper from "@/app/(main)/form/components/formWrapper"
import MaxWidth from "@/components/layout/maxWidth"

export default function Page() {
  return (
    <MaxWidth asChild center type="content">
      <div className="prose flex flex-col flex-nowrap gap-y-4">
        <h1>Message Form Page</h1>
        <FormWrapper />
      </div>
    </MaxWidth>
  )
}
