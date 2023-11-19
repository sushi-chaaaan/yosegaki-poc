import MessageForm from "@/app/(main)/form/components/form"
import MaxWidth from "@/components/layout/maxWidth"

export default async function Page() {
  return (
    <MaxWidth asChild type="content">
      <div>
        <span className="text-xl">Message Form Page</span>
        <MessageForm />
      </div>
    </MaxWidth>
  )
}
