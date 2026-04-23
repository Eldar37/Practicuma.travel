import Link from 'next/link';

import { ContentCard } from '@/components/content/ContentCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import { tours } from '@/lib/data';
import type { ContentItem } from '@/lib/types';
import { getFeaturedContent, getTourById } from '@/lib/utils';

export function ContentSection({ items }: { items: ContentItem[] }) {
  const featured = getFeaturedContent(items);

  return (
    <section className="section-shell overflow-hidden">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Inspiration"
          title="Вдохновение для поездки"
          description="Видео, маршруты и истории от наших авторов. Контент сразу связан с реальными турами и регионами."
        />
        <Link href="/content" className={buttonStyles({ variant: 'dark', size: 'lg' })}>
          Смотреть контент
        </Link>
      </div>
      <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
        {featured.map((item) => {
          const linkedTour = item.linkedTourId ? getTourById(tours, item.linkedTourId) : undefined;
          return (
            <div key={item.id} className="w-[340px] flex-none">
              <ContentCard item={item} linkedTourHref={linkedTour ? `/tours/${linkedTour.slug}` : undefined} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
