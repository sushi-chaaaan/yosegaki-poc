import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import SignInButton from "@/components/supabase/signInButton"
import SignOutButton from "@/components/supabase/signOutButton"
import { createClient } from "@/supabase/utils/serverClient"

const Header = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  return (
    <header className="h-[80px] w-full border-b border-b-zinc-500">
      <div className="flex flex-row flex-nowrap items-center justify-between p-4">
        <Link href="/">itsuki birthday</Link>
        {data.user &&
          data.user.user_metadata?.avatar_url &&
          data.user.user_metadata?.user_name && (
            <div className="flex flex-row flex-nowrap items-center gap-x-2">
              <Image
                alt="avatar"
                height={40}
                src={data.user.user_metadata.avatar_url}
                width={40}
              />
              <div className="flex flex-col flex-nowrap">
                <span>
                  <strong>@{data.user.user_metadata.user_name}</strong>
                </span>
                <SignOutButton />
              </div>
            </div>
          )}
        {!data.user && <SignInButton />}
      </div>
    </header>
  )
}

export default Header
