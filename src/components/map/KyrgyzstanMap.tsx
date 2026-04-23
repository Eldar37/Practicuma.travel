'use client';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/Skeleton';
import type { MapPointRecord } from '@/lib/types';

interface KyrgyzstanMapProps {
  points: MapPointRecord[];
  selectedPointId?: string | null;
  onPointSelect?: (point: MapPointRecord) => void;
  className?: string;
  simplified?: boolean;
}

const MapComponent = dynamic(() => import('./internal/MapInner').then((module) => module.MapInner), {
  ssr: false,
  loading: () => <Skeleton className="h-full min-h-[360px] w-full rounded-[2rem]" />
});

export function KyrgyzstanMap(props: KyrgyzstanMapProps) {
  return <MapComponent {...props} />;
}
