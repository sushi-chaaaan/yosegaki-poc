import "server-only"

import { cookies } from "next/headers"

import { createClient } from "@/supabase/utils/serverClient"

export const getServerSession = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  return await supabase.auth.getSession()
}
