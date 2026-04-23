import Image from 'next/image';
import Link from 'next/link';

import { Flame, MapPin, Users } from 'lucide-react';

import { StarRating } from '@/components/shared/StarRating';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import type { Tour } from '@/lib/types';
import { cn, difficultyLabels, formatCurrency, tourCategoryLabels } from '@/lib/utils';

interface TourCardProps {
  tour: Tour;
  compact?: boolean;
}

const categoryVariant: Record<Tour['category'], 'primary' | 'accent' | 'success' | 'danger' | 'dark'> = {
  burning: 'danger',
  weekend: 'accent',
  kyrgyzstan: 'primary',
  trekking: 'dark',
  cultural: 'success'
};

export function TourCard({ tour, compact = false }: TourCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant={categoryVariant[tour.category]}>{tourCategoryLabels[tour.category]}</Badge>
          {tour.isHot ? (
            <Badge variant="danger" className="gap-1">
              <Flame className="h-3 w-3" />
              Горящий
            </Badge>
          ) : null}
        </div>
        <Badge variant="dark" className="absolute right-4 top-4 bg-white/90 text-dark">
          {tour.duration}
        </Badge>
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <h3 className={cn('text-xl font-bold leading-tight', compact && 'text-lg')}>{tour.title}</h3>
          <p className={cn('line-clamp-2 text-sm leading-6 text-slate-600', compact && 'line-clamp-3')}>
            {tour.shortDescription}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{tour.location}</span>
            </div>
            <StarRating value={tour.rating} reviewCount={tour.reviewCount} />
          </div>
          {!compact ? (
            <Badge variant="neutral" className="hidden sm:inline-flex">
              {difficultyLabels[tour.difficulty]}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full">
              <Image src={tour.guide.photo} alt={tour.guide.name} fill className="object-cover" sizes="44px" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{tour.guide.name}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Users className="h-3.5 w-3.5" />
                Группа {tour.groupSize.min}-{tour.groupSize.max}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Цена</p>
            <p className="font-heading text-2xl font-extrabold text-dark">{formatCurrency(tour.price, tour.currency)}</p>
            <p className="text-xs text-slate-500">/ чел</p>
          </div>
        </div>
        <Link href={`/tours/${tour.slug}`} className={buttonStyles({ variant: 'primary', size: 'md', fullWidth: true })}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
