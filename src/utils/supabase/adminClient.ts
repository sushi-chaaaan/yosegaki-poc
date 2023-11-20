import { createClient as createAdminClient } from "@supabase/supabase-js"

import { env } from "@/env.mjs"
import { Database } from "@/types/supabase"

export const createClient = () => {
  return createAdminClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  )
}
