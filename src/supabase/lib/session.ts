import { cookies } from "next/headers"

import { createClient } from "@/supabase/utils/serverClient"

export const getServerSession = async (cookie: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookie)
  return await supabase.auth.getSession()
}
