import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-5/6 w-5/6 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
