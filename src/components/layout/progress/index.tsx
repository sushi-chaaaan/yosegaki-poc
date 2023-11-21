import NextTopLoader from "nextjs-toploader"

import RefreshProgress from "@/components/layout/progress/refresh"

export default function ProgressBar() {
  return (
    <>
      <NextTopLoader color="#2b78dd" showSpinner={false} />
      <RefreshProgress />
    </>
  )
}
