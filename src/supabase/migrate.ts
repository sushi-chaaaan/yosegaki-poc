import drizzleConfig from "@root/drizzle.config"
import { migrate } from "drizzle-orm/postgres-js/migrator"

import db from "@/supabase/db"

export const migrateDB = async () => {
  await migrate(db, { migrationsFolder: drizzleConfig.out })
}

migrateDB()
