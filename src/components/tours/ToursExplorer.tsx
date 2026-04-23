'use client';

import { useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

import { Pagination } from '@/components/shared/Pagination';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { TourFilters } from '@/components/tours/TourFilters';
import { TourGrid } from '@/components/tours/TourGrid';
import { Button } from '@/components/ui/Button';
import type { DurationFilter, Tour, TourFilterState } from '@/lib/types';
import {
  buildTourQueryString,
  getCategoryCounts,
  paginate,
  parseTourSearchParams,
  sortLabels,
  sortTours,
  filterTours,
  formatReadableDate
} from '@/lib/utils';

interface ToursExplorerProps {
  tours: Tour[];
  initialFilters: TourFilterState;
}

function FilterDrawer({
  open,
  setOpen,
  children
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-label="Закрыть фильтры"
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-background p-4 lg:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-slate-300" />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold">Фильтры</h3>
              <button
                aria-label="Закрыть"
                className="rounded-full border border-slate-200 p-2 text-slate-500"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function ToursExplorer({ tours, initialFilters }: ToursExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filters = useMemo(
    () => parseTourSearchParams(Object.fromEntries(searchParams.entries())) || initialFilters,
    [initialFilters, searchParams]
  );
  const counts = useMemo(() => getCategoryCounts(tours), [tours]);
  const filteredTours = useMemo(() => filterTours(tours, filters), [filters, tours]);
  const sortedTours = useMemo(() => sortTours(filteredTours, filters.sort), [filteredTours, filters.sort]);
  const pageTours = useMemo(() => paginate(sortedTours, filters.page, 9), [sortedTours, filters.page]);
  const totalPages = Math.max(1, Math.ceil(sortedTours.length / 9));

  const updateFilters = (updater: (current: TourFilterState) => TourFilterState) => {
    const next = updater(filters);
    const safeNext = { ...next, page: Math.max(1, next.page) };
    const query = buildTourQueryString(safeNext);
    router.replace(query ? `/tours?${query}` : '/tours', { scroll: false });
  };

  const resetFilters = () => {
    router.replace('/tours', { scroll: false });
  };

  return (
    <div className="section-shell space-y-10">
      <SectionHeading
        eyebrow="Каталог"
        title="Туры по Кыргызстану"
        description="Гибкая выдача по категориям, бюджету, длительности и сложности. Все фильтры синхронизируются с URL."
      />
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden self-start lg:block lg:sticky lg:top-28">
          <TourFilters
            filters={filters}
            categoryCounts={counts}
            onCategoryToggle={(category) =>
              updateFilters((current) => ({
                ...current,
                category: current.category.includes(category)
                  ? current.category.filter((item) => item !== category)
                  : [...current.category, category],
                page: 1
              }))
            }
            onDurationToggle={(duration: DurationFilter) =>
              updateFilters((current) => ({
                ...current,
                duration: current.duration.includes(duration)
                  ? current.duration.filter((item) => item !== duration)
                  : [...current.duration, duration],
                page: 1
              }))
            }
            onDifficultyToggle={(difficulty) =>
              updateFilters((current) => ({
                ...current,
                difficulty: current.difficulty.includes(difficulty)
                  ? current.difficulty.filter((item) => item !== difficulty)
                  : [...current.difficulty, difficulty],
                page: 1
              }))
            }
            onPriceChange={(value) => updateFilters((current) => ({ ...current, priceMax: value, page: 1 }))}
            onGroupSizeChange={(value) => updateFilters((current) => ({ ...current, groupSize: value, page: 1 }))}
            onRatingChange={(value) => updateFilters((current) => ({ ...current, rating: value, page: 1 }))}
            onReset={resetFilters}
          />
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Найдено {sortedTours.length} туров</p>
              <p className="text-sm font-semibold text-slate-700">Сортировка и фильтры сохраняются в URL</p>
              {(filters.query || filters.date || filters.people) ? (
                <div className="flex flex-wrap gap-2">
                  {filters.query ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Направление: {filters.query}
                    </span>
                  ) : null}
                  {filters.date ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Дата: {formatReadableDate(filters.date)}
                    </span>
                  ) : null}
                  {filters.people ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Людей: {filters.people}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="ghost"
                className="lg:hidden"
                iconLeft={<SlidersHorizontal className="h-4 w-4" />}
                onClick={() => setMobileFiltersOpen(true)}
              >
                Фильтры
              </Button>
              <select
                className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                value={filters.sort}
                onChange={(event) =>
                  updateFilters((current) => ({
                    ...current,
                    sort: event.target.value as TourFilterState['sort'],
                    page: 1
                  }))
                }
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TourGrid tours={pageTours} />
          <Pagination page={filters.page} totalPages={totalPages} onPageChange={(page) => updateFilters((current) => ({ ...current, page }))} />
        </div>
      </div>

      <FilterDrawer open={mobileFiltersOpen} setOpen={setMobileFiltersOpen}>
        <TourFilters
          filters={filters}
          categoryCounts={counts}
          onCategoryToggle={(category) =>
            updateFilters((current) => ({
              ...current,
              category: current.category.includes(category)
                ? current.category.filter((item) => item !== category)
                : [...current.category, category],
              page: 1
            }))
          }
          onDurationToggle={(duration: DurationFilter) =>
            updateFilters((current) => ({
              ...current,
              duration: current.duration.includes(duration)
                ? current.duration.filter((item) => item !== duration)
                : [...current.duration, duration],
              page: 1
            }))
          }
          onDifficultyToggle={(difficulty) =>
            updateFilters((current) => ({
              ...current,
              difficulty: current.difficulty.includes(difficulty)
                ? current.difficulty.filter((item) => item !== difficulty)
                : [...current.difficulty, difficulty],
              page: 1
            }))
          }
          onPriceChange={(value) => updateFilters((current) => ({ ...current, priceMax: value, page: 1 }))}
          onGroupSizeChange={(value) => updateFilters((current) => ({ ...current, groupSize: value, page: 1 }))}
          onRatingChange={(value) => updateFilters((current) => ({ ...current, rating: value, page: 1 }))}
          onReset={resetFilters}
          onApply={() => setMobileFiltersOpen(false)}
        />
      </FilterDrawer>
    </div>
  );
}
