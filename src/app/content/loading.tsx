import { Skeleton } from '@/components/ui/Skeleton';

export default function ContentLoading() {
  return (
    <div className="section-shell space-y-8">
      <Skeleton className="h-[320px] rounded-[2.5rem]" />
      <div className="masonry-grid columns-1 md:columns-2 xl:columns-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="mb-6 h-[360px] rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}
