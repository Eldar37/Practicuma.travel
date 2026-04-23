import { ContentGrid } from '@/components/content/ContentGrid';
import { contentItems } from '@/lib/data';

export default function ContentPage({
  searchParams
}: {
  searchParams: { type?: 'video' | 'blog' | 'ai-route' };
}) {
  const initialType = searchParams.type ?? 'all';

  return <ContentGrid items={contentItems} initialType={initialType} />;
}
