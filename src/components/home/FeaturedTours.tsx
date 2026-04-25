'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { TourCard } from '@/components/tours/TourCard';
import { buttonStyles } from '@/components/ui/Button';
import type { Tour } from '@/lib/types';
import { getFeaturedToursByCategory } from '@/lib/utils';
import { tourCategoryLabelsByLocale } from '@/lib/i18n';

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  const [activeTab, setActiveTab] = useState<'burning' | 'weekend' | 'kyrgyzstan'>('burning');
  const { locale, t } = useSitePreferences();
  const tabs = [
    { value: 'burning' as const, label: `🔥 ${tourCategoryLabelsByLocale[locale].burning}` },
    { value: 'weekend' as const, label: `🏕️ ${tourCategoryLabelsByLocale[locale].weekend}` },
    { value: 'kyrgyzstan' as const, label: `🏔️ ${tourCategoryLabelsByLocale[locale].kyrgyzstan}` }
  ];
  const featured = useMemo(() => getFeaturedToursByCategory(tours, activeTab), [activeTab, tours]);

  return (
    <section className="section-shell">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Featured" title={t('home.featuredTitle')} description={t('home.featuredDescription')} />
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab.value
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white text-slate-600 shadow-soft hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} compact />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <Link href={`/tours?category=${activeTab}`} className={buttonStyles({ variant: 'dark', size: 'lg' })}>
          {t('home.viewAll')}
        </Link>
      </div>
    </section>
  );
}
