'use client';

import { SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import type { DurationFilter, Tour, TourFilterState } from '@/lib/types';
import {
  difficultyLabels,
  durationLabels,
  groupSizeOptions,
  tourCategoryLabels
} from '@/lib/utils';

interface TourFiltersProps {
  filters: TourFilterState;
  categoryCounts: Record<Tour['category'], number>;
  onCategoryToggle: (category: Tour['category']) => void;
  onDurationToggle: (duration: DurationFilter) => void;
  onDifficultyToggle: (difficulty: Tour['difficulty']) => void;
  onPriceChange: (value: number) => void;
  onGroupSizeChange: (value: string) => void;
  onRatingChange: (value: '' | '4' | '4.5') => void;
  onReset: () => void;
  onApply?: () => void;
}

export function TourFilters({
  filters,
  categoryCounts,
  onCategoryToggle,
  onDurationToggle,
  onDifficultyToggle,
  onPriceChange,
  onGroupSizeChange,
  onRatingChange,
  onReset,
  onApply
}: TourFiltersProps) {
  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold">Фильтры</h3>
          <p className="mt-1 text-sm text-slate-500">Настройте выдачу под поездку</p>
        </div>
        <span className="rounded-full bg-slate-100 p-2 text-slate-500">
          <SlidersHorizontal className="h-4 w-4" />
        </span>
      </div>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Категория</h4>
        <div className="space-y-2">
          {(
            ['burning', 'weekend', 'kyrgyzstan', 'trekking', 'cultural'] as Tour['category'][]
          ).map((category) => {
            const active = filters.category.includes(category);
            return (
              <label
                key={category}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                  active ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-primary"
                    checked={active}
                    onChange={() => onCategoryToggle(category)}
                  />
                  {tourCategoryLabels[category]}
                </span>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-500">{categoryCounts[category]}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Цена</h4>
          <span className="text-sm font-semibold text-slate-700">до {filters.priceMax.toLocaleString('ru-RU')} сом</span>
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          step={500}
          value={filters.priceMax}
          className="w-full accent-primary"
          onChange={(event) => onPriceChange(Number(event.target.value))}
          aria-label="Максимальная цена"
        />
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Длительность</h4>
        <div className="space-y-2">
          {(Object.keys(durationLabels) as DurationFilter[]).map((duration) => (
            <label key={duration} className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary"
                checked={filters.duration.includes(duration)}
                onChange={() => onDurationToggle(duration)}
              />
              <span>{durationLabels[duration]}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Сложность</h4>
        <div className="grid grid-cols-3 gap-2">
          {(['easy', 'medium', 'hard'] as Tour['difficulty'][]).map((difficulty) => {
            const active = filters.difficulty.includes(difficulty);
            return (
              <button
                key={difficulty}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  active ? 'bg-dark text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => onDifficultyToggle(difficulty)}
              >
                {difficultyLabels[difficulty]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Размер группы</h4>
        <select
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
          value={filters.groupSize}
          onChange={(event) => onGroupSizeChange(event.target.value)}
        >
          {groupSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Рейтинг</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Любой', value: '' as const },
            { label: '4+', value: '4' as const },
            { label: '4.5+', value: '4.5' as const }
          ].map((item) => (
            <button
              key={item.label}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                filters.rating === item.value ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => onRatingChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 pt-2">
        <Button variant="ghost" onClick={onReset}>
          Сбросить фильтры
        </Button>
        <Button className="sm:hidden" onClick={onApply}>
          Применить
        </Button>
      </div>
    </div>
  );
}
