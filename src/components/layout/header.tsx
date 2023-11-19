import Link from "next/link"

const Header = () => {
  return (
    <header className="h-[60px] w-full border-b border-b-zinc-500">
      <div className="flex flex-row flex-nowrap justify-between p-4">
        <Link href="/">itsuki birthday</Link>
      </div>
    </header>
  )
}

export default Header
