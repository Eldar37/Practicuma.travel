import { Skeleton } from '@/components/ui/Skeleton';

export default function TourDetailLoading() {
  return (
    <div className="section-shell space-y-8">
      <Skeleton className="h-6 w-72" />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Skeleton className="h-[420px] rounded-[2rem]" />
          <Skeleton className="h-16 w-full rounded-[2rem]" />
          <Skeleton className="h-[620px] rounded-[2rem]" />
        </div>
        <Skeleton className="h-[520px] rounded-[2rem]" />
      </div>
    </div>
  );
}
