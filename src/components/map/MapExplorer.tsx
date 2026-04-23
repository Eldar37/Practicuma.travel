'use client';

import { useMemo, useState } from 'react';

import { ChevronUp } from 'lucide-react';

import { KyrgyzstanMap } from '@/components/map/KyrgyzstanMap';
import { MapSidebar } from '@/components/map/MapSidebar';
import type { MapPointRecord } from '@/lib/types';

interface MapExplorerProps {
  points: MapPointRecord[];
}

export function MapExplorer({ points }: MapExplorerProps) {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(points[0]?.id ?? null);
  const [selectedType, setSelectedType] = useState<'all' | MapPointRecord['type']>('all');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(true);

  const filteredPoints = useMemo(
    () =>
      points.filter((point) => {
        const matchesType = selectedType === 'all' || point.type === selectedType;
        const matchesRegion = !selectedRegion || point.region === selectedRegion;
        const matchesSearch =
          !search ||
          point.name.toLowerCase().includes(search.toLowerCase()) ||
          point.description.toLowerCase().includes(search.toLowerCase());

        return matchesType && matchesRegion && matchesSearch;
      }),
    [points, search, selectedRegion, selectedType]
  );

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden bg-slate-100">
      <div className="absolute inset-0">
        <KyrgyzstanMap
          points={filteredPoints}
          selectedPointId={selectedPointId}
          onPointSelect={(point) => setSelectedPointId(point.id)}
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-y-4 left-4 z-[20] hidden w-[320px] lg:block">
        <div className="pointer-events-auto h-full max-h-[calc(100vh-7rem)]">
          <MapSidebar
            points={filteredPoints}
            search={search}
            selectedType={selectedType}
            selectedRegion={selectedRegion}
            onSearchChange={setSearch}
            onTypeChange={setSelectedType}
            onRegionChange={setSelectedRegion}
            onPointSelect={(point) => setSelectedPointId(point.id)}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[20] lg:hidden">
        <div className="mx-auto max-w-3xl px-3 pb-3">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-600"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="h-1.5 w-14 rounded-full bg-slate-300" />
              <ChevronUp className={`h-4 w-4 transition ${mobileOpen ? '' : 'rotate-180'}`} />
            </button>
            {mobileOpen ? (
              <div className="h-[55vh] p-3 pt-0">
                <MapSidebar
                  points={filteredPoints}
                  search={search}
                  selectedType={selectedType}
                  selectedRegion={selectedRegion}
                  onSearchChange={setSearch}
                  onTypeChange={setSelectedType}
                  onRegionChange={setSelectedRegion}
                  onPointSelect={(point) => {
                    setSelectedPointId(point.id);
                    setMobileOpen(false);
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
