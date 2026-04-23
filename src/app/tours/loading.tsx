import { Skeleton } from '@/components/ui/Skeleton';

export default function ToursLoading() {
  return (
    <div className="section-shell space-y-8">
      <Skeleton className="h-14 w-72" />
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Skeleton className="h-[720px] rounded-[2rem]" />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-[480px] rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}
