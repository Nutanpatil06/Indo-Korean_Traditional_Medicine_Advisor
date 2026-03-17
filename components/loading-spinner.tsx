import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      <span className="ml-2 text-green-600">Loading...</span>
    </div>
  )
}
