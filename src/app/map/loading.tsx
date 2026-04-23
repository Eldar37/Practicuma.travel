import { Skeleton } from '@/components/ui/Skeleton';

export default function MapLoading() {
  return (
    <div className="h-[calc(100vh-5rem)] p-4">
      <div className="grid h-full gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Skeleton className="h-full rounded-[2rem]" />
        <Skeleton className="h-full rounded-[2rem]" />
      </div>
    </div>
  );
}
