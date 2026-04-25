'use client';

import Image from 'next/image';

import { Search } from 'lucide-react';

import { useSitePreferences } from '@/components/preferences/SitePreferencesProvider';
import { Badge } from '@/components/ui/Badge';
import type { MapPointRecord } from '@/lib/types';
import { mapTypeLabelsByLocale, regionLabelsByLocale } from '@/lib/i18n';

interface MapSidebarProps {
  points: MapPointRecord[];
  search: string;
  selectedType: 'all' | MapPointRecord['type'];
  selectedRegion: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: 'all' | MapPointRecord['type']) => void;
  onRegionChange: (value: string) => void;
  onPointSelect: (point: MapPointRecord) => void;
}

export function MapSidebar({
  points,
  search,
  selectedType,
  selectedRegion,
  onSearchChange,
  onTypeChange,
  onRegionChange,
  onPointSelect
}: MapSidebarProps) {
  const { locale, t } = useSitePreferences();

  return (
    <div className="flex h-full flex-col gap-5 rounded-[2rem] bg-white p-5 shadow-card dark:bg-slate-900">
      <div>
        <h2 className="font-heading text-2xl font-extrabold dark:text-white">{t('mapPage.title')}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{t('mapPage.description')}</p>
      </div>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('mapPage.search')}
          className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {(['all', 'tour', 'attraction', 'region'] as const).map((type) => (
          <button
            key={type}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === type ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => onTypeChange(type)}
          >
            {type === 'all' ? t('mapPage.all') : mapTypeLabelsByLocale[locale][type]}
          </button>
        ))}
      </div>

      <select
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        value={selectedRegion}
        onChange={(event) => onRegionChange(event.target.value)}
      >
        <option value="">{t('mapPage.allRegions')}</option>
        {Object.entries(regionLabelsByLocale[locale]).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="space-y-3">
          {points.map((point) => (
            <button
              key={point.id}
              className="flex w-full items-center gap-3 rounded-[1.5rem] border border-slate-200 p-3 text-left transition hover:border-primary/30 hover:bg-slate-50"
              onClick={() => onPointSelect(point)}
            >
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-xl">
                <Image src={point.image} alt={point.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-dark">{point.name}</p>
                  {point.rating ? <span className="text-xs font-semibold text-amber-600">{point.rating.toFixed(1)}</span> : null}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={point.type === 'tour' ? 'primary' : point.type === 'attraction' ? 'accent' : 'dark'}>
                    {mapTypeLabelsByLocale[locale][point.type]}
                  </Badge>
                  <span className="text-xs text-slate-400">{regionLabelsByLocale[locale][point.region]}</span>
                </div>
              </div>
            </button>
          ))}
          {!points.length ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
              {t('mapPage.empty')}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
