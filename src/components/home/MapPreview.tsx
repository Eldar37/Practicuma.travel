import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { KyrgyzstanMap } from '@/components/map/KyrgyzstanMap';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import type { MapPointRecord } from '@/lib/types';
import { getFeaturedMapPoints } from '@/lib/utils';

const featuredRegions = [
  {
    title: 'Иссык-Куль',
    description: 'Озеро, weekend-туры и курортная инфраструктура.',
    image: 'https://picsum.photos/seed/issyk-preview/800/600'
  },
  {
    title: 'Нарын',
    description: 'Сон-Куль, Таш-Рабат и длинные горные маршруты.',
    image: 'https://picsum.photos/seed/naryn-preview/800/600'
  },
  {
    title: 'Ош',
    description: 'Древний город и южные экспедиционные направления.',
    image: 'https://picsum.photos/seed/osh-preview/800/600'
  }
];

export function MapPreview({ points }: { points: MapPointRecord[] }) {
  return (
    <section className="section-shell">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_360px]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Map"
            title="Исследуйте на карте"
            description="Сначала посмотрите, где находится маршрут, а уже потом открывайте карточку тура и бронирование."
          />
          <div className="h-[400px] overflow-hidden rounded-[2rem] border border-slate-200 shadow-card">
            <KyrgyzstanMap points={getFeaturedMapPoints(points)} simplified className="h-full w-full" />
          </div>
          <Link href="/map" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
            Открыть полную карту
          </Link>
        </div>

        <div className="space-y-4">
          {featuredRegions.map((region) => (
            <article key={region.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
              <div className="relative h-44">
                <Image src={region.image} alt={region.title} fill className="object-cover" sizes="360px" />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-2xl font-bold">{region.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{region.description}</p>
                <Link href="/map" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Смотреть на карте
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
