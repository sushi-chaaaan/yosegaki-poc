import Image from "next/image"
import Link from "next/link"

import SignInButton from "@/components/supabase/signInButton"
import SignOutButton from "@/components/supabase/signOutButton"
import { getServerSession } from "@/supabase/lib/session"

const Header = async () => {
  const {
    data: { session },
  } = await getServerSession()

  return (
    <header className="h-[80px] w-full border-b border-b-zinc-500">
      <div className="flex flex-row flex-nowrap items-center justify-between p-4">
        <Link href="/">itsuki birthday</Link>
        {session?.user &&
          session.user.user_metadata?.avatar_url &&
          session.user.user_metadata?.user_name && (
            <div className="flex flex-row flex-nowrap items-center gap-x-2">
              <Image
                alt="avatar"
                height={40}
                src={session.user.user_metadata.avatar_url}
                width={40}
              />
              <div className="flex flex-col flex-nowrap">
                <span>
                  <strong>@{session.user.user_metadata.user_name}</strong>
                </span>
                <SignOutButton />
              </div>
            </div>
          )}
        {!session && <SignInButton />}
      </div>
    </header>
  )
}

export default Header
