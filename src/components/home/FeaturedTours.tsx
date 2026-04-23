'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { SectionHeading } from '@/components/shared/SectionHeading';
import { TourCard } from '@/components/tours/TourCard';
import { buttonStyles } from '@/components/ui/Button';
import type { Tour } from '@/lib/types';
import { getFeaturedToursByCategory } from '@/lib/utils';

const tabs = [
  { value: 'burning' as const, label: '🔥 Горящие' },
  { value: 'weekend' as const, label: '🏕️ Выходные' },
  { value: 'kyrgyzstan' as const, label: '🏔️ Кыргызстан' }
];

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['value']>('burning');
  const featured = useMemo(() => getFeaturedToursByCategory(tours, activeTab), [activeTab, tours]);

  return (
    <section className="section-shell">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Featured"
          title="Популярные подборки туров"
          description="Самые востребованные форматы: горящие выезды, weekend-trip и маршруты по всему Кыргызстану."
        />
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab.value ? 'bg-primary text-white shadow-soft' : 'bg-white text-slate-600 shadow-soft hover:bg-slate-100'
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
          Смотреть все
        </Link>
      </div>
    </section>
  );
}
