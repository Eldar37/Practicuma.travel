import { TourCard } from '@/components/tours/TourCard';
import type { Tour } from '@/lib/types';

interface TourGridProps {
  tours: Tour[];
}

export function TourGrid({ tours }: TourGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
