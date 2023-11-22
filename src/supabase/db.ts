import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "@/env.mjs"
import * as schema from "@/supabase/schema"

const connectionString = env.SUPABASE_URL

const client = postgres(connectionString)

const db = drizzle(client, { schema })

export default db
