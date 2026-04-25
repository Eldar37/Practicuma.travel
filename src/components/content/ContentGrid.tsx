'use client';

import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';

import { ContentCard } from '@/components/content/ContentCard';
import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import type { ContentItem } from '@/lib/types';
import { tours } from '@/lib/data';
import { getTourById } from '@/lib/utils';
import { contentTypeLabelsByLocale } from '@/lib/i18n';

interface ContentGridProps {
  items: ContentItem[];
  initialType?: 'all' | ContentItem['type'];
}

export function ContentGrid({ items, initialType = 'all' }: ContentGridProps) {
  const { locale, t } = useSitePreferences();
  const tabs = [
    { value: 'all', label: contentTypeLabelsByLocale[locale].all },
    { value: 'video', label: contentTypeLabelsByLocale[locale].video },
    { value: 'blog', label: contentTypeLabelsByLocale[locale].blog },
    { value: 'ai-route', label: contentTypeLabelsByLocale[locale]['ai-route'] }
  ] as const;
  const [type, setType] = useState<typeof tabs[number]['value']>(initialType);
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesType = type === 'all' || item.type === type;
        const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
        const matchesSearch = !search || haystack.includes(search.toLowerCase());
        return matchesType && matchesSearch;
      }),
    [items, search, type]
  );

  return (
    <div className="section-shell space-y-10">
      <section className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-dark via-slate-900 to-primary px-6 py-14 text-white shadow-2xl sm:px-10">
        <span className="eyebrow bg-white/10 text-white">Content Hub</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t('contentPage.title')}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
          {t('contentPage.description')}
        </p>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('contentPage.search')}
              className="w-full rounded-full border border-white/15 bg-white/10 py-4 pl-11 pr-4 text-sm text-white placeholder:text-white/55 backdrop-blur-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                  type === tab.value ? 'bg-white text-dark' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
                onClick={() => setType(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{t('contentPage.found')} {filteredItems.length}</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{t('contentPage.mixed')}</p>
          </div>
        </div>
        <div className="masonry-grid columns-1 md:columns-2 xl:columns-3">
          {filteredItems.map((item) => {
            const linkedTour = item.linkedTourId ? getTourById(tours, item.linkedTourId) : undefined;
            return <ContentCard key={item.id} item={item} linkedTourHref={linkedTour ? `/tours/${linkedTour.slug}` : undefined} />;
          })}
        </div>
      </section>
    </div>
  );
}
