import { Skeleton } from "@/components/ui/Skeleton";

/** Route-level loading state used by every dashboard section. */
export function PageLoading() {
  return (
    <div role="status" aria-label="Loading page" className="flex flex-col gap-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
