import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  reviewCount?: number;
  className?: string;
}

export function StarRating({ value, reviewCount, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-slate-500', className)}>
      <div className="flex items-center gap-1 text-amber-500">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className={cn('h-4 w-4', index < Math.round(value) ? 'fill-current' : '')} />
        ))}
      </div>
      <span className="font-semibold text-slate-700">{value.toFixed(1)}</span>
      {reviewCount ? <span>({reviewCount})</span> : null}
    </div>
  );
}
