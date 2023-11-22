import type { Config } from "drizzle-kit"

// eslint-disable-next-line no-restricted-imports
import { env } from "./src/env.mjs"

export default {
  schema: "./src/supabase/schema/index.ts",
  out: "./drizzle",
  driver: "pg",
  breakpoints: true,
  dbCredentials: {
    connectionString: env.SUPABASE_CONNECTION_STRING,
  },
} satisfies Config
