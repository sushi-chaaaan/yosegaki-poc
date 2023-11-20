import { createClient as createNormalClient } from "@supabase/supabase-js"

import { env } from "@/env.mjs"
import { Database } from "@/types/supabase"

export const createClient = () => {
  return createNormalClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
}
