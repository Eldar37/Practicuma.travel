import { ToursExplorer } from '@/components/tours/ToursExplorer';
import { tours } from '@/lib/data';
import { parseTourSearchParams } from '@/lib/utils';

export default function ToursPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const initialFilters = parseTourSearchParams(searchParams);

  return <ToursExplorer tours={tours} initialFilters={initialFilters} />;
}
