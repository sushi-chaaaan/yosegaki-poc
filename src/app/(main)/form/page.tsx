import FormWrapper from "@/app/(main)/form/components/formWrapper"
import MaxWidth from "@/components/layout/maxWidth"

export default function Page() {
  return (
    <MaxWidth asChild type="content">
      <div className="prose">
        <h1>Message Form Page</h1>
        <FormWrapper />
      </div>
    </MaxWidth>
  )
}
