import Footer from "@/components/layout/footer"

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
