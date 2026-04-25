'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { ArrowRight } from 'lucide-react';

import { KyrgyzstanMap } from '@/components/map/KyrgyzstanMap';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buttonStyles } from '@/components/ui/Button';
import type { MapPointRecord } from '@/lib/types';
import { getFeaturedMapPoints } from '@/lib/utils';

export function MapPreview({ points }: { points: MapPointRecord[] }) {
  const { locale, t } = useSitePreferences();
  const featuredRegions = useMemo(
    () =>
      locale === 'en'
        ? [
            { title: 'Issyk-Kul', description: 'Lakeside escapes, weekend tours, and resort infrastructure.', image: 'https://picsum.photos/seed/issyk-preview/800/600' },
            { title: 'Naryn', description: 'Song-Kul, Tash-Rabat, and long mountain routes.', image: 'https://picsum.photos/seed/naryn-preview/800/600' },
            { title: 'Osh', description: 'An ancient city and southern expedition routes.', image: 'https://picsum.photos/seed/osh-preview/800/600' }
          ]
        : locale === 'ky'
          ? [
              { title: 'Ысык-Көл', description: 'Көл жээгиндеги эс алуу, дем алыш турлары жана курорттук инфраструктура.', image: 'https://picsum.photos/seed/issyk-preview/800/600' },
              { title: 'Нарын', description: 'Соң-Көл, Таш-Рабат жана узун тоо маршруттары.', image: 'https://picsum.photos/seed/naryn-preview/800/600' },
              { title: 'Ош', description: 'Байыркы шаар жана түштүк багытындагы экспедициялар.', image: 'https://picsum.photos/seed/osh-preview/800/600' }
            ]
          : [
              { title: 'Иссык-Куль', description: 'Озеро, weekend-туры и курортная инфраструктура.', image: 'https://picsum.photos/seed/issyk-preview/800/600' },
              { title: 'Нарын', description: 'Сон-Куль, Таш-Рабат и длинные горные маршруты.', image: 'https://picsum.photos/seed/naryn-preview/800/600' },
              { title: 'Ош', description: 'Древний город и южные экспедиционные направления.', image: 'https://picsum.photos/seed/osh-preview/800/600' }
            ],
    [locale]
  );

  return (
    <section className="section-shell">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_360px]">
        <div className="space-y-6">
          <SectionHeading eyebrow="Map" title={t('home.mapTitle')} description={t('home.mapDescription')} />
          <div className="h-[400px] overflow-hidden rounded-[2rem] border border-slate-200 shadow-card dark:border-slate-800">
            <KyrgyzstanMap points={getFeaturedMapPoints(points)} simplified className="h-full w-full" />
          </div>
          <Link href="/map" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
            {t('home.openMap')}
          </Link>
        </div>

        <div className="space-y-4">
          {featuredRegions.map((region) => (
            <article key={region.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-44">
                <Image src={region.image} alt={region.title} fill className="object-cover" sizes="360px" />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-2xl font-bold dark:text-white">{region.title}</h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{region.description}</p>
                <Link href="/map" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t('home.regionView')}
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
