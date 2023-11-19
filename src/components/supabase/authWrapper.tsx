"use client"

import { Auth } from "@supabase/auth-ui-react"
import React from "react"

import { createClient } from "@/utils/supabase/client"

type Props = Omit<React.ComponentPropsWithoutRef<typeof Auth>, "supabaseClient">

const AuthWrapper = (props: Props) => {
  const client = createClient()

  return <Auth supabaseClient={client} {...props} />
}

export default AuthWrapper
