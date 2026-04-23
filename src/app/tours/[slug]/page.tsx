import { notFound } from 'next/navigation';

import { TourDetail } from '@/components/tours/TourDetail';
import { tours } from '@/lib/data';
import { getTourBySlug } from '@/lib/utils';

export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug
  }));
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(tours, params.slug);

  if (!tour) {
    notFound();
  }

  return <TourDetail tour={tour} />;
}
