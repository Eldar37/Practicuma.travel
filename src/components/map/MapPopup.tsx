import Image from 'next/image';

import { Star } from 'lucide-react';

import type { MapPointRecord } from '@/lib/types';

interface MapPopupProps {
  point: MapPointRecord;
  tourHref?: string;
}

export function MapPopup({ point, tourHref }: MapPopupProps) {
  return (
    <div className="w-[220px] overflow-hidden rounded-[1rem]">
      <div className="relative h-28 overflow-hidden rounded-[0.9rem]">
        <Image src={point.image} alt={point.name} fill className="object-cover" sizes="220px" />
      </div>
      <div className="space-y-2 px-1 pb-1 pt-3">
        <h3 className="text-base font-bold text-dark">{point.name}</h3>
        <p className="text-sm leading-5 text-slate-600">{point.description}</p>
        {point.rating ? (
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold text-slate-700">{point.rating.toFixed(1)}</span>
          </div>
        ) : null}
        {tourHref ? (
          <a
            href={tourHref}
            className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Смотреть тур
          </a>
        ) : null}
      </div>
    </div>
  );
}
